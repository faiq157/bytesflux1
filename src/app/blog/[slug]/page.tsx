
import { notFound } from 'next/navigation';
import { supabase } from "../utils/supabaseClient"

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) return notFound();

  return (
    <article className="prose dark:prose-invert mx-auto py-10">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">{post.date} · {post.read_time}</p>
      {post.image && <img src={post.image} alt={post.title} className="rounded-lg" />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
