export const config = {
  runtime: "edge"
};

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST 요청만 허용됩니다" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  let prompt;
  try {
    const body = await request.json();
    prompt = body.prompt;
  } catch (e) {
    return new Response(JSON.stringify({ error: "요청 본문을 읽을 수 없습니다" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (!prompt || typeof prompt !== "string") {
    return new Response(JSON.stringify({ error: "prompt가 필요합니다" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "서버에 API 키가 설정되지 않았습니다" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 700,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: `Anthropic API 오류: ${errText.slice(0,300)}` }), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("");

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: `서버 오류: ${e.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
