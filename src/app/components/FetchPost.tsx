'use client';

import { useState, useEffect, FormEvent } from "react";
import CommentsSection from "./CommentsSection";
import { Post } from "../page";
type Props = {
  id: string;
};


export default function FetchPost({ id }: Props) {
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:3000/api/posts?id=${id}`);
        const posts = await res.json();
        
        if (!res.ok ) {
          setPost(null);
        } else {
          
          const post = posts.find((p: Post) => p._id === id);
          setPost(post || null);  
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    console.log("Deleted:", result);
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-2">{post.content}</p>
      <div className=" space-x-3">
        <button className="bg-blue-400 rounded-2xl p-2">Update Post</button>
        <button onClick={handleDelete} className="bg-red-400 rounded-2xl p-2">
          Delete Post
        </button>
      </div>
      <hr className="my-6" />
      {post && <CommentsSection postId={post._id} />}
    </div>
  );
}
