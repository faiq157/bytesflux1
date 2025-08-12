// src/app/blog/page.tsx
'use client';

import { usePosts } from "../hooks/usePosts";
import BlogList from "./components/BlogList";

export default function BlogPage() {
  const { posts, loading, error } = usePosts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <BlogList posts={posts}  />
    </div>
  );
}
