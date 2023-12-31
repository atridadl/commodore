import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/remix";
import CommandItem from "./components/CommandItem";
import { Twitch } from "lucide-react";

export default function Index() {
  const { user } = useUser();

  return (
    <main className="flex flex-col text-center items-center justify-center px-4 py-16 gap-4 min-h-[100%]">
      <div className="fixed top-2 right-2">
        <UserButton afterSignOutUrl="/" userProfileMode="modal" />
      </div>
      <h1 className="text-4xl sm:text-6xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
        Commodore
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
          command={`$(eval const res = $(urlfetch https://commodore.atri.dad/api/followage/$(channel)/$(user)?uid=${user?.id}); res.string)`}
        />

        <CommandItem
          title="subcount"
          command={`$(eval const res = $(urlfetch https://commodore.atri.dad/api/subcount/$(channel)?uid=${user?.id}); res.string)`}
        />
      </SignedIn>

      <SignedOut>
        <h2 className="text-xl sm:text-2xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          Sign in to get started!
        </h2>

        <a className="btn btn-primary" href="/sign-in">
          <Twitch /> Sign in with Twitch
        </a>
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
