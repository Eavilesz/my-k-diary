import { NextRequest, NextResponse } from "next/server";
import { getPostData, postExists, updatePost } from "@/lib/posts";

// Get a specific post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!postExists(id)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = await getPostData(id);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// Update a specific post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (!postExists(id)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await updatePost(id, data);

    return NextResponse.json({ id, success: true });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
