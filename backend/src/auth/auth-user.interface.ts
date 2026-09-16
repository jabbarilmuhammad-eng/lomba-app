export interface AuthUser {
  sub: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}