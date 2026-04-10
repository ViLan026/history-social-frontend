// Không có "use client"
import { cookies } from 'next/headers';

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('jwt_token')?.value;

  // Truyền token thủ công do gọi từ Server
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`, {
    headers,
    next: { revalidate: 3600 } // Tái tạo trang 1 tiếng/lần để update comment SEO
  });

  if (!res.ok) return <div>Bài viết không tồn tại.</div>;
  const post = await res.json();

  return (
    <article className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="flex gap-2 mt-2">
         {post.tags.map((tag: string) => (
           <span key={tag} className="badge bg-gray-200 px-2 py-1 rounded">{tag}</span>
         ))}
      </div>
      <p className="mt-6">{post.content}</p>
      
      {/* Ở đây bạn có thể nhúng Client Component <CommentSection postId={post.id} /> 
        để xử lý tương tác thời gian thực 
      */}
    </article>
  );
}