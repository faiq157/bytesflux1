import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { instance, accessToken, status } = await request.json();

    // Use environment variable as fallback if no access token provided
    const token = accessToken || process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN;
    const mastodonInstance = instance || process.env.NEXT_PUBLIC_MASTODON_INSTANCE;

    if (!mastodonInstance || !token || !status) {
      return NextResponse.json(
        { error: 'Instance URL, access token, and status are required' },
        { status: 400 }
      );
    }

    // Post to Mastodon
    const response = await fetch(`${mastodonInstance}/api/v1/statuses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Failed to post to Mastodon' },
        { status: response.status }
      );
    }

    const postData = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Post successful',
      post: {
        id: postData.id,
        url: postData.url,
        content: postData.content,
        createdAt: postData.created_at,
      }
    });

  } catch (error) {
    console.error('Mastodon post error:', error);
    return NextResponse.json(
      { error: 'Failed to post to Mastodon' },
      { status: 500 }
    );
  }
} 