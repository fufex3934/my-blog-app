'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";

export type Post = {
  _id: string;
  title: string;
  content: string;
};

export default  function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:3000/api/posts");
      const data = await res.json();
      
      setPosts(data);
    };
    
    fetchPosts();
  }, []); 
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Blogs</h1>

      {posts.map((post: Post) => (
        <div key={post._id}  className="border p-4 mt-4">
          <Link href={`/posts/${post._id}`}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </Link>
          <p>{post.content.substring(0, 100)}...</p>
          
        </div>
      ))}
    </div>
  );
}
