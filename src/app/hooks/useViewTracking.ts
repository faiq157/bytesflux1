'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../blog/utils/supabaseClient';
interface UseViewTrackingProps {
  postId: string;
  initialViews?: number;
}

interface ViewTrackingResult {
  views: number;
  isLoading: boolean;
  error: string | null;
  trackView: () => Promise<void>;
  refreshViews: () => Promise<void>;
}

export const useViewTracking = ({ postId, initialViews = 0 }: UseViewTrackingProps): ViewTrackingResult => {
  const [views, setViews] = useState(initialViews);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track a new view
  const trackView = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/blog/api/views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          // Additional tracking data can be added here
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to track view');
      }

      const data = await response.json();
      
      if (data.success) {
        setViews(data.viewCount);
        
        // Update the post's views in the database
        await supabase
          .from('blog_posts')
          .update({ views: data.viewCount })
          .eq('id', postId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track view');
      console.error('Error tracking view:', err);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  // Refresh view count
  const refreshViews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/blog/api/views?postId=${postId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch view count');
      }

      const data = await response.json();
      setViews(data.viewCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch view count');
      console.error('Error fetching view count:', err);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  // Set up real-time subscription for view count updates
  useEffect(() => {
    if (!postId) return;

    // Subscribe to changes in the blog_post_views table for this post
    const viewsSubscription = supabase
      .channel(`post-views-${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_post_views',
          filter: `post_id=eq.${postId}`,
        },
        async (payload) => {
          // Refresh view count when views table changes
          await refreshViews();
        }
      )
      .subscribe();

    // Subscribe to changes in the blog_posts table for this post
    const postSubscription = supabase
      .channel(`post-${postId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'blog_posts',
          filter: `id=eq.${postId}`,
        },
        (payload) => {
          // Update local state when post views are updated
          if (payload.new && 'views' in payload.new) {
            setViews(payload.new.views as number);
          }
        }
      )
      .subscribe();

    // Initial view count fetch
    refreshViews();

    // Cleanup subscriptions
    return () => {
      viewsSubscription.unsubscribe();
      postSubscription.unsubscribe();
    };
  }, [postId, refreshViews]);

  return {
    views,
    isLoading,
    error,
    trackView,
    refreshViews,
  };
}; 