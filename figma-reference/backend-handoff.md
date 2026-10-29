# Backend Handoff — Endpoint GET /api/quota/futsal

Dokumen ini dibuat untuk diberikan ke pemegang backend NestJS.
Jangan terapkan ke folder backend tanpa review terlebih dahulu.

---

## Informasi Endpoint yang Sudah Ada

### GET /registrations/futsal
- **File**: `backend/src/registrations/registrations.controller.ts`
- **Apa yang dikembalikan**: Semua data registrasi futsal (termasuk nama tim, anggota, dll)
- **Autentikasi**: **Tidak ada guard** — endpoint ini **publik**
- **Masalah**: Karena tidak ada guard, data pendaftar bisa diakses publik. Endpoint ini TIDAK boleh digunakan oleh beranda untuk menghitung kuota (data sensitif).
- **Saran**: Tambahkan JwtAuthGuard atau AdminApiGuard ke endpoint ini jika belum ada di PR berikutnya.

---

## Endpoint Baru yang Diusulkan: GET /api/quota/futsal

### Spesifikasi
- **Method**: GET  
- **Path**: `/api/quota/futsal` (atau `/registrations/quota/futsal`)
- **Guard**: Tidak perlu guard — hanya mengembalikan angka agregat, bukan data personal
- **Response**: `{ "total": 16, "verified": number }`
  - `total`: 16 (hardcoded, bisa diambil dari config/env)
  - `verified`: jumlah tim futsal yang pembayarannya berstatus VERIFIED

### Logika Penghitungan
"Verified" = count of `Registration` WHERE `type = FUTSAL` JOIN `Payment` WHERE `payment.status = VERIFIED`

Termasuk pendaftaran offline yang dicatat manual dengan status VERIFIED.
PENDING dan REJECTED **tidak dihitung**.

---

## Contoh Implementasi NestJS (prisma-next ORM)

> Sesuaikan dengan ORM yang dipakai: `db.orm.public.Registration.where({}).count()` atau kueri raw.

### registrations.controller.ts (tambahan)

```typescript
import { Controller, Get } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  // ... endpoint yang sudah ada ...

  /**
   * GET /registrations/quota/futsal
   * Publik — hanya mengembalikan angka agregat.
   * Tidak mengandung data personal peserta.
   */
  @Get('quota/futsal')
  async getFutsalQuota() {
    return this.registrationsService.getFutsalQuota();
  }
}
```

### registrations.service.ts (tambahan)

```typescript
import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db'; // sesuaikan path

const FUTSAL_QUOTA_TOTAL = 16;

@Injectable()
export class RegistrationsService {
  // ... service yang sudah ada ...

  async getFutsalQuota(): Promise<{ total: number; verified: number }> {
    // Hitung jumlah Registration bertipe FUTSAL dengan Payment.status = VERIFIED
    // Menggunakan prisma-next ORM (sesuaikan sintaks jika berbeda):

    // Opsi A — raw query (lebih aman dari race condition):
    // const result = await db.query(`
    //   SELECT COUNT(*) as verified
    //   FROM "Registration" r
    //   INNER JOIN "Payment" p ON p."registrationId" = r.id
    //   WHERE r.type = 'FUTSAL' AND p.status = 'VERIFIED'
    // `);
    // const verified = parseInt(result.rows[0].verified, 10) || 0;

    // Opsi B — ORM (sesuaikan dengan API prisma-next yang dipakai di project ini):
    const registrations = await db.orm.public.Registration
      .where({ type: 'FUTSAL' })
      .all();

    let verified = 0;
    for (const reg of registrations) {
      // Akses payment terkait — sesuaikan dengan cara join ORM ini
      const payment = await db.orm.public.Payment
        .where({ registrationId: reg.id, status: 'VERIFIED' })
        .first();
      if (payment) verified++;
    }
    // Catatan: gunakan Opsi A (raw query) untuk performa lebih baik di produksi

    return {
      total: FUTSAL_QUOTA_TOTAL,
      verified: Math.min(verified, FUTSAL_QUOTA_TOTAL),
    };
  }
}
```

---

## Saran CORS

Karena endpoint ini publik (tidak butuh auth), pastikan CORS sudah diizinkan di `main.ts`:

```typescript
// main.ts (yang sudah ada di project)
app.enableCors({ origin: true }); // sudah ada, tidak perlu ubah

// Atau jika ingin lebih ketat untuk produksi:
app.enableCors({
  origin: ['https://armaso.example.com', 'http://localhost:3000'],
  methods: ['GET'],
});
```

---

## Saran Pencegahan Race Condition (Kuota Melebihi 16)

Validasi batas 16 tim ada di **backend**, bukan di frontend.
Saat memverifikasi pembayaran futsal, tambahkan pengecekan sebelum update status:

```typescript
// payments.service.ts — tambahkan di method verifyPayment / patchVerify

async verifyPayment(paymentId: number): Promise<void> {
  // 1. Ambil payment + registration terkait
  const payment = await db.orm.public.Payment.where({ id: paymentId }).first();
  if (!payment) throw new NotFoundException('Payment tidak ditemukan');

  const registration = await db.orm.public.Registration
    .where({ id: payment.registrationId })
    .first();

  // 2. Jika futsal, cek kuota sebelum memverifikasi
  if (registration?.type === 'FUTSAL') {
    // Jalankan di dalam transaksi database untuk mencegah race condition:
    // (Dua admin tidak bisa memverifikasi tim ke-16 dan ke-17 secara bersamaan)

    // Pseudocode dengan transaksi:
    // await db.transaction(async (tx) => {
    //   const currentVerified = await tx.query(
    //     `SELECT COUNT(*) FROM "Registration" r
    //      INNER JOIN "Payment" p ON p."registrationId" = r.id
    //      WHERE r.type = 'FUTSAL' AND p.status = 'VERIFIED'
    //      FOR UPDATE`  // ← row-level lock mencegah race condition
    //   );
    //   if (currentVerified >= 16) {
    //     throw new BadRequestException('Kuota futsal (16 tim) sudah penuh');
    //   }
    //   await tx.Payment.where({ id: paymentId }).update({ status: 'VERIFIED' });
    // });

    const quotaResult = await this.registrationsService.getFutsalQuota();
    if (quotaResult.verified >= 16) {
      throw new BadRequestException(
        'Kuota futsal sudah penuh (16 tim terverifikasi). Tidak dapat memverifikasi pembayaran ini.'
      );
    }
  }

  // 3. Update status ke VERIFIED
  await db.orm.public.Payment.where({ id: paymentId }).update({ status: 'VERIFIED' });
}
```

**Catatan penting**: Pengecekan di atas tanpa transaksi masih bisa race condition jika dua request masuk bersamaan. Gunakan `SELECT ... FOR UPDATE` (PostgreSQL advisory lock atau row lock) di dalam transaksi untuk keamanan penuh.

---

## Cara Frontend Memanggil Endpoint Ini

Frontend (`frontend/components/home/data/quota.ts`) sudah disiapkan:

```typescript
// quota.ts — fallback saat endpoint belum tersedia
const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function getFutsalQuota(): Promise<{ total: number; verified: number }> {
  try {
    const res = await fetch(`${BASE}/registrations/quota/futsal`, {
      next: { revalidate: 60 }, // atau cache: 'no-store' jika SSR
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch {
    // Fallback: tampilkan "-" di UI, jangan crash
    return { total: 16, verified: 0 };
  }
}
```

Frontend memperbarui kuota setiap 60 detik menggunakan `setInterval` di client component.
Jika endpoint gagal, tampilkan `"-"` bukan crash.

