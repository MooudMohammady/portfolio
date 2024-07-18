"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider, theme as t } from "antd";
import { useTheme } from "next-themes";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? t.darkAlgorithm : t.defaultAlgorithm,
      }}>
      <SessionProvider>{children}</SessionProvider>;
    </ConfigProvider>
  );
}
