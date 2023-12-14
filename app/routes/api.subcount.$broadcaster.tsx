import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const uid = url.searchParams.get("uid");
  const broadcaster = params.broadcaster;

  if (!uid) {
    return json(
      {
        error: "Missing uid!",
        string: "Error: Missing uid!",
      },
      400
    );
  }

  const getTokenResponse = await fetch(
    `https://api.clerk.com/v1/users/${uid}/oauth_access_tokens/oauth_twitch`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` || "",
      },
      method: "GET",
    }
  );

  const tokenResponse = await getTokenResponse.json();

  const token = tokenResponse[0].token;

  const broadcasterIdRes = await (
    await fetch(`https://api.twitch.tv/helix/users?login=${broadcaster}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID || "",
      }),
    })
  ).json();

  if (!broadcasterIdRes) {
    return json(
      {
        error: "Broadcaster not found!",
        string: "Error: Broadcaster not found!",
      },
      400
    );
  }
  console.log(broadcasterIdRes);

  const broadcasterId = broadcasterIdRes.data[0].id;

  const res = await (
    await fetch(
      `https://api.twitch.tv/helix/subscriptions?broadcaster_id=${broadcasterId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID || "",
        },
      }
    )
  ).json();

  if (res.error) {
    return json(
      {
        error: res.error,
      },
      500
    );
  }

  const count = res.total;

  return json(
    {
      count,
      string: `💜 ${broadcaster} has ${count} subscribers!`,
    },
    200
  );
};
