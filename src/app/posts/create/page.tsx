'use client';

import { useState } from "react";

export default function CreatePost() {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const res = await fetch("/api/posts",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({title,content}),
    });
    if(res.ok){
      alert("Post Created");
    }

  };
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6">
      <h1 className="font-extrabold text-2xl mb-3">Create New Post</h1>
      <input type="text" placeholder="Enter Post Title" 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      required
      className="p-4 border w-full mb-4"
      /> 
      <textarea value={content}
      onChange={(e)=>setContent(e.target.value)}
      cols={20}
      placeholder="Enter Post Description"
      required
       className="p-4 border w-full"
      />
      <button type="submit" className="bg-green-400 p-4 mt-2 rounded-full font-black hover:bg-green-800 cursor-pointer">Create Post</button>
    </form>
  )
}
