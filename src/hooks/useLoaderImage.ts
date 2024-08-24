"use client";

import type { ImageLoaderProps } from "next/image";

export function useLoaderImage(): (p: ImageLoaderProps) => string {
  const myLoader = ({ src }: ImageLoaderProps) => {
    return `${src}`;
  };

  return myLoader;
}
