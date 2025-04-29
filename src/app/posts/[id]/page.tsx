import FetchPost from "@/app/components/FetchPost";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
 
  return <FetchPost id={id}/>
  
}
