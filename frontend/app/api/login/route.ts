import { baseService } from "@/services/backend";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_COOKIE_NAME } from "@/constants/fixtures";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();

  const response: any = await baseService(
    "staff/login",
    { email, password },
    "POST"
  );

  if (response.status == 201) {
    cookieStore.set(TOKEN_COOKIE_NAME, response.result.token);
    return NextResponse.json({ success: true }, { status: 201 });
  } else {
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }
}
