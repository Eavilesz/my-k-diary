import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPostsData } from "@/lib/posts";

// Handle GET requests to fetch all posts
export async function GET() {
  try {
    const posts = await getAllPostsData();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Handle POST requests to create new posts
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
