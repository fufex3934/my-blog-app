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
    async function fetchComments() {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data);
    }
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      <h1>Comments</h1>
      <ul>
        {comments.map((com) => (
          <li key={com._id}>{com.comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={3}
          value={newcomment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment"
          required
        />

        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}
