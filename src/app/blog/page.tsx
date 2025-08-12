// src/app/blog/page.tsx
'use client';

import { usePosts } from "../hooks/usePosts";
import BlogList from "./components/BlogList";

export default function BlogPage() {
  return (
    <div className="">
      <BlogList />
    </div>
  );
}
