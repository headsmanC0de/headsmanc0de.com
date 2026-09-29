import { NextResponse } from "next/server";

export function GET() {
	return NextResponse.json({ status: "ok", commit: process.env.GIT_SHA ?? null });
}
