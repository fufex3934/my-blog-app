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
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts?id=${id}`);
        const posts = await res.json();

        if (!res.ok) {
          setPost(null);
        } else {
          const matchedPost = posts.find((p: Post) => p._id === id);
          setPost(matchedPost || null);
          if (matchedPost) {
            setTitle(matchedPost.title);
            setContent(matchedPost.content);
          }
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
    if (res.ok) {
      setPost(null);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
      }
  
      const result = await res.json();
      
      setPost(result.post); 
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {editMode ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            className="w-full border p-2 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border p-2 mb-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save Changes
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="mb-4">{post.content}</p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </>
      )}

      <CommentsSection postId={id} />
    </div>
  );
}
