import { NextResponse } from "next/server";
import { getAllPostsData, createPost } from "@/lib/posts";

export async function GET() {
  try {
    const posts = await getAllPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error in GET /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const postData = await request.json();
    const id = await createPost(postData);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
