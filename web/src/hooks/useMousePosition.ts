'use client';

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5, px: 0, py: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setPos({
        x: window.innerWidth > 0 ? e.clientX / window.innerWidth : 0.5,
        y: window.innerHeight > 0 ? e.clientY / window.innerHeight : 0.5,
        px: e.clientX,
        py: e.clientY,
      });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return pos;
}
