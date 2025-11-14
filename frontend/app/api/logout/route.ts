import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/constants/fixtures";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  cookieStore.delete(TOKEN_COOKIE_NAME);
  return NextResponse.json({ success: true }, { status: 200 });
}
