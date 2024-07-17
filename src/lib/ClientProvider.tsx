"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default async function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
