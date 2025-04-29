import { notFound } from "next/navigation";
import { Post } from "@/app/page";
import CommentsSection from "@/app/components/CommentsSection";
async function fetchPost(id: string) {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();
  const post = posts.find((post: Post) => post._id === id);

  if (!post) {
    notFound();
  }
  return post;
}
export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPost(id);
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>
      <hr className="my-6" />
      <CommentsSection postId={post._id}/>
    </div>
  );
}
