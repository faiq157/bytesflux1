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

    console.log('PUT /api/[slug] - Updating post with slug:', slug);
    console.log('Request body:', body);

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Get the post first to get its ID
    console.log('Looking for post with slug:', slug);
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, published, featured')
      .eq('slug', slug)
      .single();

    console.log('Existing post lookup result:', { existingPost, fetchError });

    if (fetchError) {
      console.error('Error fetching post for slug:', slug, 'Error:', fetchError);
      return NextResponse.json(
        { error: 'Error fetching post', details: fetchError.message },
        { status: 500 }
      );
    }

    if (!existingPost) {
      console.error('Post not found for slug:', slug);
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    console.log('Found existing post:', existingPost);

    // Update the post - only include fields that exist in the database
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    // Only include fields that exist in the database schema
    if (body.title) {
      updateData.title = body.title;
      // Don't change slug during update to avoid conflicts
      updateData.path = `/blog/${slug}`;
    }

    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.content !== undefined) {
      updateData.content = body.content;
      const wordCount = body.content.split(/\s+/).length;
      const readTime = Math.ceil(wordCount / 200);
      updateData.read_time = `${readTime} min read`;
    }
    if (body.category !== undefined) updateData.category = body.category;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.published !== undefined) updateData.published = body.published;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.seo !== undefined) updateData.seo = body.seo;

    console.log('Update data:', updateData);
    console.log('Updating post with ID:', existingPost.id);

    // Check if we have any data to update
    if (Object.keys(updateData).length <= 1) { // Only has updated_at
      console.log('No fields to update, returning existing post');
      return NextResponse.json(existingPost);
    }

    // Now do the actual update
    const { data: post, error: updateError } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', existingPost.id)
      .select()
      .single();

    console.log('Update result:', { post, updateError });

    if (updateError) {
      console.error('Error updating post:', updateError);
      return NextResponse.json(
        { error: 'Failed to update post', details: updateError.message },
        { status: 500 }
      );
    }

    if (!post) {
      console.error('No post returned after update');
      return NextResponse.json(
        { error: 'Post update succeeded but no data returned' },
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

    console.log('DELETE /api/[slug] - Deleting post with slug:', slug);

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Get the post first to get its ID
    console.log('Looking for post with slug:', slug);
    const { data: existingPost, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title')
      .eq('slug', slug)
      .single();

    console.log('Existing post lookup result:', { existingPost, fetchError });

    if (fetchError) {
      console.error('Error fetching post for deletion:', fetchError);
      return NextResponse.json(
        { error: 'Error fetching post', details: fetchError.message },
        { status: 500 }
      );
    }

    if (!existingPost) {
      console.error('Post not found for deletion with slug:', slug);
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    console.log('Found post to delete:', existingPost);

    // Delete related comments and ratings first
    console.log('Deleting related comments and ratings...');
    const { error: commentsDeleteError } = await supabase
      .from('blog_comments')
      .delete()
      .eq('post_id', existingPost.id);

    if (commentsDeleteError) {
      console.error('Error deleting comments:', commentsDeleteError);
      // Continue with post deletion even if comments deletion fails
    }

    const { error: ratingsDeleteError } = await supabase
      .from('blog_ratings')
      .delete()
      .eq('post_id', existingPost.id);

    if (ratingsDeleteError) {
      console.error('Error deleting ratings:', ratingsDeleteError);
      // Continue with post deletion even if ratings deletion fails
    }

    // Delete the post
    console.log('Deleting post with ID:', existingPost.id);
    const { error: deleteError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', existingPost.id);

    if (deleteError) {
      console.error('Error deleting post:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete post', details: deleteError.message },
        { status: 500 }
      );
    }

    console.log('Post deleted successfully');
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/[slug]:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
