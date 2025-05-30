import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/posts";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const id = await createPost(data);

    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
