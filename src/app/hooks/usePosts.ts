// hooks/usePosts.ts
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BlogPost } from '../blog/types';

export const usePosts = (category?: string) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/blog/api/posts', {
        params: category ? { category } : {},
      });
      
      // The API returns { posts: [...], pagination: {...} }
      if (res.data && res.data.posts && Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      } else {
        console.warn('API returned unexpected data structure:', res.data);
        setPosts([]);
      }
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Error fetching posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  return { posts, loading, error };
};
