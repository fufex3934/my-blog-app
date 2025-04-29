"use client";
import React, { FormEvent, useEffect, useState } from "react";

type Comment = {
  _id: string;
  postId: string;
  comment: string;
  createdAt: string;
};
export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newcomment, setNewComment] = useState("");

  useEffect(() => {
    if(!postId)return;
    async function fetchComments() {
      const res = await fetch(`http://localhost:3000/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data);
    }
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!postId || !newcomment.trim()) return;
    await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, comment: newcomment }),
    });
    setNewComment("");

    //re-fetch comments
    const res = await fetch(`/api/comments?postId=${postId}`);
    const data = await res.json();
    setComments(data);
  };
  
  return (
    <div>
      <h1 className="text-xl font-semibold">Comments</h1>
      <ul>
        {comments.map((com) => (
          <li className="border p-2 my-2" key={com._id}>{com.comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4 flex space-x-6">
        <textarea
        className="border basis-1/2"
          rows={3}
          
          value={newcomment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment"
          required
        />

        <button  className="mt-2 px-4 py-2 bg-blue-600 text-white" type="submit">Post Comment</button>
      </form>
    </div>
  );
}
