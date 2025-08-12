import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../utils/supabaseClient';
import { CreateRatingData } from '../../types';

// GET /api/ratings - Get ratings for a specific post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('post_id');
    const userId = searchParams.get('user_id');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('blog_ratings')
      .select('*')
      .eq('post_id', postId);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: ratings, error } = await query;

    if (error) {
      console.error('Error fetching ratings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch ratings' },
        { status: 500 }
      );
    }

    // Calculate average rating and total ratings
    const totalRatings = ratings?.length || 0;
    const avgRating = totalRatings > 0
      ? ratings!.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

    // Get user's rating if userId is provided
    const userRating = userId && ratings ? ratings.find(r => r.user_id === userId) : null;

    return NextResponse.json({
      ratings,
      totalRatings,
      avgRating: Math.round(avgRating * 10) / 10,
      userRating: userRating?.rating || null
    });
  } catch (error) {
    console.error('Error in GET /api/ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/ratings - Create or update a rating
export async function POST(request: NextRequest) {
  try {
    const body: CreateRatingData = await request.json();

    if (!body.post_id || !body.user_id || !body.rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if user already rated this post
    const { data: existingRating, error: checkError } = await supabase
      .from('blog_ratings')
      .select('id')
      .eq('post_id', body.post_id)
      .eq('user_id', body.user_id)
      .single();

    let result;
    if (existingRating) {
      // Update existing rating
      const { data: rating, error: updateError } = await supabase
        .from('blog_ratings')
        .update({ rating: body.rating })
        .eq('id', existingRating.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating rating:', updateError);
        return NextResponse.json(
          { error: 'Failed to update rating' },
          { status: 500 }
        );
      }
      result = rating;
    } else {
      // Create new rating
      const { data: rating, error: insertError } = await supabase
        .from('blog_ratings')
        .insert({
          ...body,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating rating:', insertError);
        return NextResponse.json(
          { error: 'Failed to create rating' },
          { status: 500 }
        );
      }
      result = rating;
    }

    // Update the post's average rating
    await updatePostRating(body.post_id);

    return NextResponse.json(result, { status: existingRating ? 200 : 201 });
  } catch (error) {
    console.error('Error in POST /api/ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/ratings - Delete a rating
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('post_id');
    const userId = searchParams.get('user_id');

    if (!postId || !userId) {
      return NextResponse.json(
        { error: 'Post ID and User ID are required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('blog_ratings')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting rating:', error);
      return NextResponse.json(
        { error: 'Failed to delete rating' },
        { status: 500 }
      );
    }

    // Update the post's average rating
    await updatePostRating(postId);

    return NextResponse.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to update post rating
async function updatePostRating(postId: string) {
  try {
    const { data: ratings, error } = await supabase
      .from('blog_ratings')
      .select('rating')
      .eq('post_id', postId);

    if (error) {
      console.error('Error fetching ratings for update:', error);
      return;
    }

    const totalRatings = ratings?.length || 0;
    const avgRating = totalRatings > 0
      ? ratings!.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

    await supabase
      .from('blog_posts')
      .update({
        rating: Math.round(avgRating * 10) / 10,
        total_ratings: totalRatings
      })
      .eq('id', postId);
  } catch (error) {
    console.error('Error updating post rating:', error);
  }
} 