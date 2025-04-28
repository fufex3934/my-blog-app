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
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <CommentsSection postId={post._id}/>
    </div>
  );
}
