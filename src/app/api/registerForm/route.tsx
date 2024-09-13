import { schema } from "@/app/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);
  if (parsed.success) {
    // Add data to the database
    return NextResponse.json({
      message: "User registered using Form Data",
      data: parsed.data,
    });
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
}
