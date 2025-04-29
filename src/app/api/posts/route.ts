import connectToDB from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const posts = await Post.find().sort({ createdAt: -1 });;
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  await connectToDB();
  const { title, content } = await req.json();
  const newPost = new Post({ title, content });
  await newPost.save();
  return NextResponse.json(newPost, { status: 201 });
}
