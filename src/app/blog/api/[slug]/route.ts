// src/app/blog/api/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../utils/supabaseClient';


// GET /api/[slug] - Get a single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Get the post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (postError || !post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await supabase
      .from('blog_posts')
      .update({ views: (post.views || 0) + 1 })
      .eq('id', post.id);

    // Get comments for this post
    const { data: comments, error: commentsError } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', post.id)
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (commentsError) {
      console.error('Error fetching comments:', commentsError);
    }

    // Get average rating
    const { data: ratings, error: ratingsError } = await supabase
      .from('blog_ratings')
      .select('rating')
      .eq('post_id', post.id);

    if (ratingsError) {
      console.error('Error fetching ratings:', ratingsError);
    }

    const avgRating = ratings && ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    // Get related posts (same category)
    const { data: relatedPosts, error: relatedError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, image, created_at')
      .eq('category', post.category)
      .eq('published', true)
      .neq('id', post.id)
      .order('created_at', { ascending: false })
      .limit(3);

    if (relatedError) {
      console.error('Error fetching related posts:', relatedError);
    }

    const postWithExtras = {
      ...post,
      comments: comments || [],
      avgRating: Math.round(avgRating * 10) / 10,
      totalRatings: ratings?.length || 0,
      relatedPosts: relatedPosts || []
    };

    return NextResponse.json(postWithExtras);
  } catch (error) {
    console.error('Error in GET /api/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/[slug] - Update a blog post by slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Get the post first to get its ID
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Update the post
    const updateData = {
      ...body,
      updated_at: new Date().toISOString()
    };

    if (body.title) {
      const newSlug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      updateData.slug = newSlug;
      updateData.path = `/blog/${newSlug}`;
    }

    if (body.content) {
      const wordCount = body.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      updateData.read_time = `${readTime} min read`;
    }

    const { data: post, error: updateError } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', existingPost.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating post:', updateError);
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in PUT /api/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/[slug] - Delete a blog post by slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Get the post first to get its ID
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete related comments and ratings first
    await supabase.from('blog_comments').delete().eq('post_id', existingPost.id);
    await supabase.from('blog_ratings').delete().eq('post_id', existingPost.id);

    // Delete the post
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', existingPost.id);

    if (deleteError) {
      console.error('Error deleting post:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
