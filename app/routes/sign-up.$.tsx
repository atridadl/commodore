import { SignUp } from "@clerk/remix";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return json({
    ENV: {
      ROOT_URL: process.env.ROOT_URL,
    },
  });
}

export default function SignUpPage() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <main className="flex flex-col text-center items-center justify-center px-4 py-16 gap-4 min-h-[100%]">
      <SignUp
        appearance={{
          elements: {
            socialButtonsBlockButton__google: {
              display: "none",
            },
            socialButtonsIconButton__google: {
              display: "none",
            },
            socialButtonsProviderIcon_google: {
              display: "none",
            },
            socialButtonsBlockButton__github: {
              display: "none",
            },
            socialButtonsIconButton__github: {
              display: "none",
            },
            socialButtonsProviderIcon_github: {
              display: "none",
            },
          },
        }}
        path="/sign-in"
        routing="path"
        signInUrl="/sign-up"
        redirectUrl={ENV.ROOT_URL ? ENV.ROOT_URL : "/"}
      />{" "}
    </main>
  );
}
