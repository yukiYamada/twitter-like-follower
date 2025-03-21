"use client";

import { useState } from "react";

export default function Home() {
  const [tweetId, setTweetId] = useState("");
  const [userId, setUserId] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult([]);
    const res = await fetch("/api/like-follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweetId,
        userId,
        bearerToken,
      }),
    });

    const data = await res.json();
    setResult(data.followed || []);
    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Twitter いいねフォローツール</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Bearer Token: </label>
        <input
          type="text"
          value={bearerToken}
          onChange={(e) => setBearerToken(e.target.value)}
          style={{ width: "500px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>あなたの User ID: </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>ツイートID: </label>
        <input
          type="text"
          value={tweetId}
          onChange={(e) => setTweetId(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "実行中..." : "いいねした人をフォロー"}
      </button>

      <ul>
        {result.map((r, i) => (
          <li key={i}>
            @{r.username} → {r.status === 200 ? "✅成功" : "❌失敗"}
          </li>
        ))}
      </ul>
    </main>
  );
}
