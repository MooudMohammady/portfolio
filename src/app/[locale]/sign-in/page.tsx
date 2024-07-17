"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function Login() {
  const router = useRouter();
  const locale = useLocale();
  signIn("sign-in", { redirect: false, callbackUrl: `/${locale}/admin` }).then(
    () => {
      router.push(`/${locale}/admin`);
    }
  );
}
