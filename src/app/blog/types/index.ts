export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  author_id: string;
  date: string;
  read_time: string | null;
  category: string;
  tags: string[];
  image: string | null;
  video_url: string | null;
  slug: string;
  path: string;
  featured: boolean | null;
  published: boolean | null;
  views: number | null;
  rating: number | null;
  total_ratings: number | null;
  comments: number;
  created_at: string | null;
  updated_at: string | null;
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogType: string;
    structuredData: any;
  } | null;
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogComment {
  id: string;
  post_id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
  parent_id?: string;
  replies?: BlogComment[];
  user_avatar?: string;
}

export interface BlogRating {
  id: string;
  post_id: string;
  user_id: string;
  rating: number;
  created_at: string;
}

export interface BlogSearchFilters {
  category?: string;
  author?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  searchTerm?: string;
}

export interface BlogPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CreateBlogPostData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  video_url?: string;
  published?: boolean;
  featured?: boolean;
  seo?: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogType: string;
    structuredData: any;
  };
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  id: string;
}

export interface CreateCommentData {
  post_id: string;
  author: string;
  email: string;
  content: string;
  parent_id?: string;
}

export interface CreateRatingData {
  post_id: string;
  user_id: string;
  rating: number;
} 