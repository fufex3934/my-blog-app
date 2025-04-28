import Link from "next/link";
export type Post ={
  _id:string,
  title:string,
  content:string,
};
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();
  return (
    <div>
      <h1>Simple Blog</h1>
      {
        posts.map((post:Post)=>(
          <div key={post._id}>
            <Link href={`/posts/${post._id}`}>
            <h2>{post.title}</h2>
            </Link>
          </div>
        ))
      }
    </div>
  );
}
