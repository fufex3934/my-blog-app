import connectToDB from "@/app/lib/mongoose";
import Comment from "@/app/models/Comment";
import { NextRequest, NextResponse } from "next/server";

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
  const comments = Comment.find({ postId });
  return NextResponse.json(comments);
}
