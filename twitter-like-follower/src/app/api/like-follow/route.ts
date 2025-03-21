import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { tweetId, userId, bearerToken } = await req.json();

  if (!tweetId || !userId || !bearerToken) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const res = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}/liking_users`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    const users = res.data.data || [];
    const results = [];

    for (const user of users) {
      const followRes = await axios.post(
        `https://api.twitter.com/2/users/${userId}/following`,
        { target_user_id: user.id },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      results.push({ username: user.username, status: followRes.status });
    }

    return NextResponse.json({ followed: results });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
