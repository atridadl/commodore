import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { broadcaster: string; user: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get("uid");
  const broadcaster = params.broadcaster;

  if (!uid) {
    return Response.json({
      error: "Missing uid!",
      string: "Error: Missing uid!",
    });
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

  // console.log(token);

  const broadcasterIdRes = await (
    await fetch(`https://api.twitch.tv/helix/users?login=${broadcaster}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID || "",
      }),
    })
  ).json();

  if (!broadcasterIdRes) {
    return Response.json({
      error: "Broadcaster not found!",
      string: "Error: Broadcaster not found!",
    });
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
    return Response.json({
      error: res.error,
    });
  }

  const count = res.total;

  return Response.json({
    count,
    string: `💜 ${broadcaster} has ${count} subscribers!`,
  });
}
