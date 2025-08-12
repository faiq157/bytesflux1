import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database schema types
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string;
          author: string;
          author_id: string;
          date: string;
          read_time: string;
          category: string;
          tags: string[];
          image: string;
          slug: string;
          path: string;
          featured: boolean;
          published: boolean;
          views: number;
          rating: number;
          total_ratings: number;
          created_at: string;
          updated_at: string;
          seo: any;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          content: string;
          author: string;
          author_id: string;
          date: string;
          read_time: string;
          category: string;
          tags: string[];
          image: string;
          slug: string;
          path: string;
          featured?: boolean;
          published?: boolean;
          views?: number;
          rating?: number;
          total_ratings?: number;
          created_at?: string;
          updated_at?: string;
          seo?: any;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          author?: string;
          author_id?: string;
          date?: string;
          read_time?: string;
          category?: string;
          tags?: string[];
          image?: string;
          slug?: string;
          path?: string;
          featured?: boolean;
          published?: boolean;
          views?: number;
          rating?: number;
          total_ratings?: number;
          created_at?: string;
          updated_at?: string;
          seo?: any;
        };
      };
      blog_categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          slug: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          slug: string;
          color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          slug?: string;
          color?: string;
          created_at?: string;
        };
      };
      blog_comments: {
        Row: {
          id: string;
          post_id: string;
          author: string;
          email: string;
          content: string;
          date: string;
          approved: boolean;
          parent_id?: string;
          user_avatar?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author: string;
          email: string;
          content: string;
          date?: string;
          approved?: boolean;
          parent_id?: string;
          user_avatar?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author?: string;
          email?: string;
          content?: string;
          date?: string;
          approved?: boolean;
          parent_id?: string;
          user_avatar?: string;
          created_at?: string;
        };
      };
      blog_ratings: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          rating: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          rating: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          rating?: number;
          created_at?: string;
        };
      };
    };
  };
}
