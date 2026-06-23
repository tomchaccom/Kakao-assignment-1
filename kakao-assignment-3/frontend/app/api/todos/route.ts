function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  }
  return value;
}

const BACKEND_URL = getRequiredEnv("BACKEND_URL");

function getTodoId(request: Request) {
  return new URL(request.url).searchParams.get("id");
}

async function proxyRequest(path: string, init?: RequestInit) {
  try {
    const response = await fetch(
      `${BACKEND_URL.replace(/\/$/, "")}/todos${path}`,
      {
      ...init,
      cache: "no-store",
      },
    );
    const body = response.status === 204 ? null : await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { detail: "백엔드 서버에 연결할 수 없습니다." },
      { status: 502 },
    );
  }
}

export async function GET() {
  return proxyRequest("");
}

export async function POST(request: Request) {
  return proxyRequest("", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await request.text(),
  });
}

export async function PUT(request: Request) {
  const todoId = getTodoId(request);

  if (!todoId) {
    return Response.json({ detail: "Todo id가 필요합니다." }, { status: 400 });
  }

  return proxyRequest(`/${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: await request.text(),
  });
}

export async function DELETE(request: Request) {
  const todoId = getTodoId(request);

  if (!todoId) {
    return Response.json({ detail: "Todo id가 필요합니다." }, { status: 400 });
  }

  return proxyRequest(`/${todoId}`, { method: "DELETE" });
}
