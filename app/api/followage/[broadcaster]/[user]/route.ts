import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { broadcaster: string; user: string } }
) {
  function monthDayDifference(date1: Date, date2: Date) {
    const timeDifference = Math.abs(date2.getTime() - date1.getTime());
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const monthsDifference = Math.floor(daysDifference / 30.44); // The average number of days in a month
    const remainingDays = Math.round(daysDifference % 30.44);

    return { months: monthsDifference, days: remainingDays };
  }

  const searchParams = request.nextUrl.searchParams;
  const uid = searchParams.get("uid");
  const user = params.user;
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

  console.log("🟢 FollowAge called!");

  const token = tokenResponse[0].token;

  const userIDRes = await (
    await fetch(`https://api.twitch.tv/helix/users?login=${user}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID || "",
      }),
    })
  ).json();

  const broadcasterIdRes = await (
    await fetch(`https://api.twitch.tv/helix/users?login=${broadcaster}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID || "",
      }),
    })
  ).json();

  if (userIDRes.data.length === 0 || userIDRes.data.length === 0) {
    return Response.json({
      error: "User or broadcaster not found!",
      string: "Error: User or broadcaster not found!",
    });
  }

  const userId = userIDRes.data[0].id;
  const broadcasterId = broadcasterIdRes.data[0].id;

  if (userId === broadcasterId) {
    return Response.json({
      error: "User and broadcaster cannot be the same!",
      string: "Uh-oh! You can't follow yourself, silly human!",
    });
  }

  const res = await (
    await fetch(
      `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}&user_id=${userId}`,
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

  const data = res.data[0];

  const followed_at = new Date(data.followed_at);
  const diff = monthDayDifference(followed_at, new Date());

  return Response.json({
    followed_at,
    followed_for_months: diff.months,
    followed_for_days: diff.days,
    string: `🎉🎉🎉 ${user} has been following ${broadcaster} for ${diff.months} months and ${diff.days} days!`,
  });
}
