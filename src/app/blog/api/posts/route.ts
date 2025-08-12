import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../utils/supabaseClient';
import { CreateBlogPostData, UpdateBlogPostData } from '../../types';

// GET /api/posts - Get all posts with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const author = searchParams.get('author');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published') || 'true';

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

    // Process posts to add comment counts
    const processedPosts = posts?.map(post => ({
      ...post,
      comments: Array.isArray(post.comments) ? post.comments.length : 0
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

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const postData = {
      ...body,
      slug,
      read_time: `${readTime} min read`,
      author_id: 'admin', // This should come from auth context
      date: new Date().toISOString(),
      views: 0,
      rating: 0,
      total_ratings: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      path: `/blog/${slug}`
    };

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
      const slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      updateData.slug = slug;
      updateData.path = `/blog/${slug}`;
    }

    // Only update read_time if content is provided
    if (body.content) {
      const wordCount = body.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      updateData.read_time = `${readTime} min read`;
    }

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
