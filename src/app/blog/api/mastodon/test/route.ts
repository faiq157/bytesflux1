import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { instance, accessToken } = await request.json();

    // Use environment variable as fallback if no access token provided
    const token = accessToken || process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN;
    const mastodonInstance = instance || process.env.NEXT_PUBLIC_MASTODON_INSTANCE;

    if (!mastodonInstance || !token) {
      return NextResponse.json(
        { error: 'Instance URL and access token are required' },
        { status: 400 }
      );
    }

    // Test the connection by fetching the user's account info
    const response = await fetch(`${mastodonInstance}/api/v1/accounts/verify_credentials`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Failed to verify credentials' },
        { status: response.status }
      );
    }

    const accountData = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Connection successful',
      account: {
        username: accountData.username,
        displayName: accountData.display_name,
        instance: instance,
      }
    });

  } catch (error) {
    console.error('Mastodon test connection error:', error);
    return NextResponse.json(
      { error: 'Failed to test connection' },
      { status: 500 }
    );
  }
} 