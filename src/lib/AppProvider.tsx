import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import ClientProvider from "./ClientProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default async function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <AntdRegistry>
        <ClientProvider>{children}</ClientProvider>;
      </AntdRegistry>
    </NextIntlClientProvider>
  );
}
