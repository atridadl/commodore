import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import CommandItem from "./_components/CommandItem";
import { Twitch } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex flex-col text-center items-center justify-center px-4 py-16 gap-4">
      <div className="fixed top-2 right-2">
        <UserButton />
      </div>
      <h1 className="text-4xl sm:text-6xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Atri&apos;s Twitch Command Helpers
      </h1>

      <br />
      <br />

      <SignedIn>
        <h2 className="text-2xl">Account Details</h2>
        <p> Your user ID is: {`${user?.id}` || `No token found`}</p>

        <br />
        <br />

        <h2 className="text-2xl">Nightbot Command Helpers</h2>
        <CommandItem
          title="followage"
          command={`$(eval const res = $(urlfetch https://commands.atri.dad/api/followage/$(channel)/$(user)?uid=${user?.id}); res.string)`}
        />

        <CommandItem
          title="subcount"
          command={`$(eval const res = $(urlfetch https://commands.atri.dad/api/subcount/$(channel)?uid=${user?.id}); res.string)`}
        />
      </SignedIn>

      <SignedOut>
        <h2 className="text-xl sm:text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Sign in to get started!
        </h2>

        <SignInButton>
          <button className="btn btn-active btn-primary">
            <Twitch /> Sign in with Twitch
          </button>
        </SignInButton>
      </SignedOut>

      <br />
      <br />

      <div className="flex-row flex">
        <h2 className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Built with 💜 by <a href="https://atri.dad">Atridad Lahiji</a>
        </h2>
      </div>
    </main>
  );
}
