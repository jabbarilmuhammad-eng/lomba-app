"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Menandai elemen sudah masuk layar (sekali saja). Dipakai untuk animasi muncul.
 * Mandiri: tidak bergantung pada class "home-reveal" di globals.css.
 * Animasi dimatikan lewat varian Tailwind "motion-reduce:" di komponen yang memakainya.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, shown };
}
