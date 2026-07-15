import { NextResponse } from "next/server";

// .env থেকে আপনার ব্যাকএন্ডের ডোমেইন নেবে, না পেলে ডিফল্ট লাইভ ডোমেইন ব্যবহার করবে
const BACKEND_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://pet-server-site.vercel.app";

async function handleProxy(request) {
  // ১. ব্যাকএন্ডের সম্পূর্ণ পাথ তৈরি করা
  const backendUrl = `${BACKEND_URL}${request.nextUrl.pathname}${request.nextUrl.search}`;
  
  // ২. রিকোয়েস্টের হেডারগুলো কপি করা
  const headers = new Headers(request.headers);
  
  // আলাদা ডোমেন সিকিউরিটির জন্য হোস্ট হেডারটি ব্যাকএন্ড ইউআরএল অনুযায়ী পরিবর্তন করা অত্যন্ত জরুরী
  const parsedUrl = new URL(BACKEND_URL);
  headers.set("host", parsedUrl.host);

  let body = null;
  
  // ৩. GET বা HEAD বাদে অন্য মেথড হলে নিরাপদে রিকোয়েস্ট বডি রিড করা (যাতে ক্র্যাশ না করে)
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.arrayBuffer();
    } catch (e) {
      console.warn("Could not read request body:", e);
    }
  }

  try {
    // ৪. ব্যাকএন্ড সার্ভারে প্রক্সি রিকোয়েস্ট পাঠানো
    const response = await fetch(backendUrl, {
      method: request.method,
      headers: headers,
      body: body,
      redirect: "manual", // Better Auth-এর রিডাইরেক্টগুলো যাতে সরাসরি হ্যান্ডেল হয়
    });

    // ৫. ব্যাকএন্ডের সমস্ত রেসপন্স এবং কুকি হেডার্সসহ ফ্রন্টএন্ডে ব্যাক করা
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

// Better Auth-এর সমস্ত রিকোয়েস্ট মেথড হ্যান্ডেল করার জন্য রপ্তানি করা হলো
export async function GET(request) { return handleProxy(request); }
export async function POST(request) { return handleProxy(request); }
export async function PUT(request) { return handleProxy(request); }
export async function DELETE(request) { return handleProxy(request); }
export async function PATCH(request) { return handleProxy(request); }