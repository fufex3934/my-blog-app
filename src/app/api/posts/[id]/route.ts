import connectToDB from "@/app/lib/mongoose";
import Post from "@/app/models/Post";

import { NextResponse } from "next/server";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const {id} = await params;
  console.log(id);

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
//update
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const postId = (await params).id;
  const { title, content } = await req.json();

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
