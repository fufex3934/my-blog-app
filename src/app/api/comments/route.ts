import connectToDB from "@/app/lib/mongoose";
import Comment from "@/app/models/Comment";
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
export async function POST(req: NextRequest) {
  await connectToDB();
  const { postId, comment } = await req.json();
  const newComment = new Comment({ postId, comment });
  await newComment.save();
  return NextResponse.json(newComment, { status: 201 });
}

export async function GET(req: NextRequest) {
  await connectToDB();
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  if (!postId || !isValidObjectId(postId)) {
    return NextResponse.json({ error: "Invalid or missing postId" }, { status: 400 });
  }

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
