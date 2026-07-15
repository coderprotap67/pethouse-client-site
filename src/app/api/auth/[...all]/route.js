import { NextResponse } from "next/server";
const BACKEND_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://pet-server-site.vercel.app";

async function handleProxy(request) {
  const backendUrl = `${BACKEND_URL}${request.nextUrl.pathname}${request.nextUrl.search}`;
  const headers = new Headers(request.headers);
  const parsedUrl = new URL(BACKEND_URL);
  headers.set("host", parsedUrl.host);

  let body = null;
  
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.arrayBuffer();
    } catch (e) {
      console.warn("Could not read request body:", e);
    }
  }
  try {
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: headers,
      body: body,
      redirect: "manual",
    });
    const newResponse = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });

    return newResponse;
  } catch (error) {
    console.error("Better Auth Proxy Error:", error);
    return NextResponse.json({ error: "Backend communication failed" }, { status: 502 });
  }
}
export async function GET(request) { return handleProxy(request); }
export async function POST(request) { return handleProxy(request); }
export async function PUT(request) { return handleProxy(request); }
export async function DELETE(request) { return handleProxy(request); }
export async function PATCH(request) { return handleProxy(request); }