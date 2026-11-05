import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import MotionProvider from "@/components/site/MotionProvider";
import React from "react";

export default async function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionProvider>{children}</MotionProvider>
    </NextIntlClientProvider>
  );
}
