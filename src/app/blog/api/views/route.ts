import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../utils/supabaseClient';

// POST /api/views - Track a blog post view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, userIp, userAgent, sessionId } = body;

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get client IP from headers if not provided
    const clientIp = userIp || 
      request.headers.get('x-forwarded-for')?.split(',')[0] || 
      request.headers.get('x-real-ip') || 
      'unknown';

    // Get user agent if not provided
    const clientUserAgent = userAgent || 
      request.headers.get('user-agent') || 
      'unknown';

    // Generate session ID if not provided
    const clientSessionId = sessionId || 
      request.headers.get('x-session-id') || 
      `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Call the database function to increment view count
    const { data: viewCount, error } = await supabase.rpc('increment_post_view', {
      post_uuid: postId,
      user_ip_address: clientIp,
      user_agent_text: clientUserAgent,
      session_id_text: clientSessionId
    });

    if (error) {
      console.error('Error incrementing view count:', error);
      return NextResponse.json(
        { error: 'Failed to track view' },
        { status: 500 }
      );
    }

    // Get the updated post with new view count
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id, views')
      .eq('id', postId)
      .single();

    if (postError) {
      console.error('Error fetching updated post:', postError);
      return NextResponse.json(
        { error: 'Failed to fetch updated post' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      viewCount: viewCount,
      postViews: post.views,
      message: 'View tracked successfully'
    });

  } catch (error) {
    console.error('Error in POST /api/views:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/views?postId=uuid - Get view count for a post
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

    // Get view count using the database function
    const { data: viewCount, error } = await supabase.rpc('get_post_view_count', {
      post_uuid: postId
    });

    if (error) {
      console.error('Error getting view count:', error);
      return NextResponse.json(
        { error: 'Failed to get view count' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      postId,
      viewCount: viewCount || 0
    });

  } catch (error) {
    console.error('Error in GET /api/views:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 