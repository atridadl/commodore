import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
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
      signUpUrl="/sign-up"
      redirectUrl={process.env.ROOT_URL ? process.env.ROOT_URL : "/"}
    />
  );
}
