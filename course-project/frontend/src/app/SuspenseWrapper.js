"use client";
import { Suspense } from "react";

export default function SuspenseWrapper({ children }) {
  return <Suspense fallback={<div className="spinner"></div>}>{children}</Suspense>;
}
