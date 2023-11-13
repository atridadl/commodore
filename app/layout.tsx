import type { Metadata } from "next";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Atri's Twitch Command Helpers",
  description: "Atri's Twitch Command Helpers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignInUrl={process.env.NEXT_PUBLIC_ROOT_URL!}
      afterSignUpUrl={process.env.NEXT_PUBLIC_ROOT_URL!}
      signInUrl={`${process.env.NEXT_PUBLIC_ROOT_URL!}/sign-in`}
      signUpUrl={`${process.env.NEXT_PUBLIC_ROOT_URL!}/sign-up`}
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="h-[100%] w-[100%] fixed overflow-y-auto">
        <body className="h-[100%] w-[100%] fixed overflow-y-auto">
          <ClerkLoaded>
            <div className="flex flex-row items-center justify-center min-h-[100%]">
              {children}
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
