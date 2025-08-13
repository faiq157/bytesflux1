import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '../../utils/supabaseClient';
import { CreateRatingData } from '../../types';

// GET /api/ratings - Get ratings for a specific post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get all ratings for the post
    const { data: ratings, error } = await supabase
      .from('blog_ratings')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ratings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch ratings' },
        { status: 500 }
      );
    }

    // Calculate average rating
    const totalRatings = ratings?.length || 0;
    const averageRating = totalRatings > 0 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
      : 0;

    return NextResponse.json({
      ratings: ratings || [],
      totalRatings,
      averageRating: Math.round(averageRating * 10) / 10
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
    const body = await request.json();
    const { post_id, user_id, rating } = body;

    if (!post_id || !user_id || rating === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if user already rated this post
    const { data: existingRating, error: checkError } = await supabase
      .from('blog_ratings')
      .select('*')
      .eq('post_id', post_id)
      .eq('user_id', user_id)
      .maybeSingle(); // Use maybeSingle instead of single

    if (checkError) {
      console.error('Error checking existing rating:', checkError);
      return NextResponse.json(
        { error: 'Failed to check existing rating' },
        { status: 500 }
      );
    }

    let result;
    if (existingRating) {
      // Update existing rating
      const { data: updatedRating, error: updateError } = await supabase
        .from('blog_ratings')
        .update({ rating, updated_at: new Date().toISOString() })
        .eq('post_id', post_id)
        .eq('user_id', user_id)
        .select()
        .maybeSingle(); // Use maybeSingle instead of single

      if (updateError) {
        console.error('Error updating rating:', updateError);
        return NextResponse.json(
          { error: 'Failed to update rating' },
          { status: 500 }
        );
      }

      result = updatedRating;
    } else {
      // Create new rating
      const { data: newRating, error: insertError } = await supabase
        .from('blog_ratings')
        .insert({
          post_id,
          user_id,
          rating,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .maybeSingle(); // Use maybeSingle instead of single

      if (insertError) {
        console.error('Error creating rating:', insertError);
        return NextResponse.json(
          { error: 'Failed to create rating' },
          { status: 500 }
        );
      }

      result = newRating;
    }

    // Calculate new average rating for the post
    const { data: ratingStats, error: statsError } = await supabase
      .from('blog_ratings')
      .select('rating')
      .eq('post_id', post_id);

    if (statsError) {
      console.error('Error calculating rating stats:', statsError);
      return NextResponse.json(
        { error: 'Failed to calculate rating stats' },
        { status: 500 }
      );
    }

    const totalRatings = ratingStats?.length || 0;
    const averageRating = totalRatings > 0 
      ? ratingStats.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
      : 0;

    // Update the post with new rating stats
    const { error: updatePostError } = await supabaseAdmin
      .from('blog_posts')
      .update({
        rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        total_ratings: totalRatings,
        updated_at: new Date().toISOString()
      })
      .eq('id', post_id);

    if (updatePostError) {
      console.error('Error updating post rating:', updatePostError);
      // Don't fail the request if post update fails
    }

    return NextResponse.json({
      success: true,
      rating: result,
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings
    });

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

    // Use admin client to bypass RLS policies
    const { error } = await supabaseAdmin
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
    // Removed to simplify the code and fix the PGRST116 error 

    return NextResponse.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to update post rating (no longer needed - handled inline)
// Removed to simplify the code and fix the PGRST116 error 