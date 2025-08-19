import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../utils/supabaseClient';
import { CreateBlogPostData, UpdateBlogPostData } from '../../types';

// GET /api/posts - Get all posts with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const category = searchParams.get('category');
    const author = searchParams.get('author');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published') || 'true';

    // If slug is provided, fetch single post by slug
    if (slug) {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          comments:blog_comments(count)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Error fetching post by slug:', error);
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      // Process post to add comment count
      const processedPost = {
        ...post,
        comments: post.comments?.[0]?.count || 0,
        views: post.views || 0
      };

      return NextResponse.json({
        posts: [processedPost],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalPosts: 1,
          postsPerPage: 1,
          hasNextPage: false,
          hasPrevPage: false
        }
      });
    }

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        comments:blog_comments(count)
      `, { count: 'exact' });

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }
    if (author) {
      query = query.eq('author_id', author);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
    }
    if (featured) {
      query = query.eq('featured', featured === 'true');
    }
    if (published !== undefined) {
      query = query.eq('published', published === 'true');
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Order by created date
    query = query.order('created_at', { ascending: false });

    const { data: posts, error, count } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    // Process posts to add comment counts and real-time view counts
    const processedPosts = posts?.map(post => ({
      ...post,
      comments: post.comments?.[0]?.count || 0,
      // Use the real-time view count from the views table
      views: post.views || 0
    })) || [];

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      posts: processedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: count || 0,
        postsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error in GET /api/posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/posts - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body: CreateBlogPostData = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from title using slugify utility
    const { slugify } = await import('../../utils/slugify');
    const slug = slugify(body.title);

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const postData = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      tags: body.tags || [],
      image: body.image || null,
      video_url: body.video_url || null,
      published: body.published || false,
      featured: body.featured || false,
      seo: body.seo || {},
      slug,
      read_time: `${readTime} min read`,
      author: 'Admin User', // Default author name
      author_id: 'admin', // This should come from auth context
      date: new Date().toISOString(),
      views: 0,
      rating: 0,
      total_ratings: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      path: `/blog/${slug}`
    };

    // Use regular client for public access
    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/posts - Update a blog post
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateBlogPostData = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      ...body,
      updated_at: new Date().toISOString()
    };

    // Only update slug and path if title is provided
    if (body.title) {
      const { slugify } = await import('../../utils/slugify');
      const slug = slugify(body.title);
      updateData.slug = slug;
      updateData.path = `/blog/${slug}`;
    }

    // Only update read_time if content is provided
    if (body.content) {
      const wordCount = body.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      updateData.read_time = `${readTime} min read`;
    }

    // Use regular client for public access
    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', body.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in PUT /api/posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts - Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Use regular client for public access
    // Delete related comments and ratings first
    await supabase.from('blog_comments').delete().eq('post_id', id);
    await supabase.from('blog_ratings').delete().eq('post_id', id);

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
