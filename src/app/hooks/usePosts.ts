// hooks/usePosts.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BlogPost, BlogPagination } from '../blog/types';

interface UsePostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  pagination: BlogPagination | null;
  fetchPosts: (page?: number, limit?: number, search?: string, selectedCategory?: string) => Promise<void>;
}

export const usePosts = (category?: string): UsePostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<BlogPagination | null>(null);

  const fetchPosts = async (page: number = 1, limit: number = 9, search?: string, selectedCategory?: string) => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit,
        ...(category && { category }),
        ...(search && { search }),
        ...(selectedCategory && selectedCategory !== 'All' && { category: selectedCategory })
      };
      
      const res = await axios.get('/blog/api/posts', { params });
      
      // The API returns { posts: [...], pagination: {...} }
      if (res.data && res.data.posts && Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
        setPagination(res.data.pagination || null);
      } else {
        console.warn('API returned unexpected data structure:', res.data);
        setPosts([]);
        setPagination(null);
      }
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Error fetching posts');
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, 9);
  }, [category]);

  return { posts, loading, error, pagination, fetchPosts };
};
