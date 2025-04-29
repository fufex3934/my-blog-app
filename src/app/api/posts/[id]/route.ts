import connectToDB from "@/app/lib/mongoose";
import Post from "@/app/models/Post";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  const postId = params.id;

  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
