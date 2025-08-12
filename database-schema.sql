-- Blog Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    author_id VARCHAR(100) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_time VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    image VARCHAR(500),
    slug VARCHAR(255) UNIQUE NOT NULL,
    path VARCHAR(255) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    seo JSONB DEFAULT '{}'
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    slug VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    author VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved BOOLEAN DEFAULT FALSE,
    parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
    user_avatar VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_ratings table
CREATE TABLE IF NOT EXISTS blog_ratings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id VARCHAR(100) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);

CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_approved ON blog_comments(approved);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON blog_comments(parent_id);

CREATE INDEX IF NOT EXISTS idx_blog_ratings_post_id ON blog_ratings(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_ratings_user_id ON blog_ratings(user_id);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for blog images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own uploads" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own uploads" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate read time
CREATE OR REPLACE FUNCTION calculate_read_time(content TEXT)
RETURNS VARCHAR AS $$
DECLARE
    word_count INTEGER;
    read_time INTEGER;
BEGIN
    -- Count words (simple approach)
    word_count := array_length(regexp_split_to_array(content, '\s+'), 1);
    
    -- Calculate read time (200 words per minute)
    read_time := CEIL(word_count::DECIMAL / 200);
    
    RETURN read_time || ' min read';
END;
$$ LANGUAGE plpgsql;

-- Insert sample categories
INSERT INTO blog_categories (name, description, slug, color) VALUES
('Technology', 'Technology and software development articles', 'technology', '#3B82F6'),
('Design', 'UI/UX design and creative content', 'design', '#10B981'),
('Business', 'Business strategy and entrepreneurship', 'business', '#F59E0B'),
('Marketing', 'Digital marketing and growth strategies', 'marketing', '#EF4444'),
('Development', 'Programming and development tutorials', 'development', '#8B5CF6')
ON CONFLICT (name) DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (
    title,
    excerpt,
    content,
    author,
    author_id,
    category,
    tags,
    slug,
    path,
    published,
    featured,
    seo
) VALUES (
    'Getting Started with Next.js 15',
    'Learn the fundamentals of Next.js 15 and build your first application with the latest features and improvements.',
    '# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements to the React framework. In this guide, we''ll explore the key changes and how to get started.

## What''s New in Next.js 15

- **Improved Performance**: Better build times and runtime performance
- **Enhanced Developer Experience**: Better error messages and debugging
- **New App Router Features**: More powerful routing capabilities
- **Better TypeScript Support**: Improved type safety and IntelliSense

## Installation

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## Key Features

### 1. App Router
The App Router provides a more intuitive way to structure your application:

```tsx
// app/page.tsx
export default function Home() {
  return <h1>Welcome to Next.js 15!</h1>
}
```

### 2. Server Components
Server Components allow you to write components that run on the server:

```tsx
// app/components/ServerComponent.tsx
async function ServerComponent() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### 3. Improved Performance
Next.js 15 includes several performance improvements:

- Faster build times
- Better code splitting
- Improved caching strategies

## Best Practices

1. **Use Server Components** when possible for better performance
2. **Implement proper error boundaries** for better user experience
3. **Optimize images** using the Next.js Image component
4. **Use TypeScript** for better type safety

## Conclusion

Next.js 15 is a significant step forward for the framework. With its improved performance, better developer experience, and new features, it''s the perfect time to start building with Next.js.

Happy coding! 🚀',
    'Admin User',
    'admin',
    'Technology',
    ARRAY['Next.js', 'React', 'JavaScript', 'Web Development'],
    'getting-started-with-nextjs-15',
    '/blog/getting-started-with-nextjs-15',
    true,
    true,
    '{"title": "Getting Started with Next.js 15 - Complete Guide", "description": "Learn the fundamentals of Next.js 15 and build your first application with the latest features and improvements.", "keywords": "Next.js 15, React, JavaScript, Web Development, Tutorial", "canonical": "/blog/getting-started-with-nextjs-15", "ogType": "article"}'
) ON CONFLICT (slug) DO NOTHING;

-- Create RLS policies for security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_ratings ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can view published posts" ON blog_posts
    FOR SELECT USING (published = true);

-- Public read access for approved comments
CREATE POLICY "Public can view approved comments" ON blog_comments
    FOR SELECT USING (approved = true);

-- Public read access for ratings
CREATE POLICY "Public can view ratings" ON blog_ratings
    FOR SELECT USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments" ON blog_comments
    FOR INSERT WITH CHECK (true);

-- Authenticated users can create ratings
CREATE POLICY "Authenticated users can create ratings" ON blog_ratings
    FOR INSERT WITH CHECK (true);

-- Users can update their own ratings
CREATE POLICY "Users can update own ratings" ON blog_ratings
    FOR UPDATE USING (user_id = auth.uid()::text);

-- Users can delete their own ratings
CREATE POLICY "Users can delete own ratings" ON blog_ratings
    FOR DELETE USING (user_id = auth.uid()::text);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create a view for blog post statistics
CREATE OR REPLACE VIEW blog_post_stats AS
SELECT 
    p.id,
    p.title,
    p.slug,
    p.views,
    p.rating,
    p.total_ratings,
    COUNT(c.id) as comment_count,
    p.created_at,
    p.updated_at
FROM blog_posts p
LEFT JOIN blog_comments c ON p.id = c.post_id AND c.approved = true
GROUP BY p.id, p.title, p.slug, p.views, p.rating, p.total_ratings, p.created_at, p.updated_at;

-- Create a function to get related posts
CREATE OR REPLACE FUNCTION get_related_posts(
    current_post_id UUID,
    category_filter VARCHAR(100),
    limit_count INTEGER DEFAULT 3
)
RETURNS TABLE (
    id UUID,
    title VARCHAR(255),
    slug VARCHAR(255),
    excerpt TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.image,
        p.created_at
    FROM blog_posts p
    WHERE p.id != current_post_id
        AND p.category = category_filter
        AND p.published = true
    ORDER BY p.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql; 