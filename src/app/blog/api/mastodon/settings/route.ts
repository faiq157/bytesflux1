import { supabase } from '@/app/blog/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  try {
    // Get Mastodon settings from database
    const { data, error } = await supabase
      .from('mastodon_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching Mastodon settings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    // If no settings exist, return default settings
    if (!data) {
      return NextResponse.json({
        settings: {
          enabled: false,
          instance: process.env.NEXT_PUBLIC_MASTODON_INSTANCE || 'https://mastodon.social',
          accessToken: process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN || '',
          autoPostNew: true,
          autoPostUpdates: false,
          includeHashtags: true,
          postFormat: 'New blog post: {title}\n\n{excerpt}\n\nRead more: {url}\n\n{hashtags}'
        }
      });
    }

    return NextResponse.json({ settings: data });

  } catch (error) {
    console.error('Error in GET /api/mastodon/settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json();

    // Validate required fields
    if (settings.enabled && (!settings.instance || !settings.accessToken)) {
      return NextResponse.json(
        { error: 'Instance URL and access token are required when enabling auto-posting' },
        { status: 400 }
      );
    }

    // Check if settings already exist
    const { data: existingSettings } = await supabase
      .from('mastodon_settings')
      .select('id')
      .single();

    let result;
    if (existingSettings) {
      // Update existing settings
      const { data, error } = await supabase
        .from('mastodon_settings')
        .update({
          enabled: settings.enabled,
          instance: settings.instance,
          access_token: settings.accessToken, // Note: using snake_case for DB
          auto_post_new: settings.autoPostNew,
          auto_post_updates: settings.autoPostUpdates,
          include_hashtags: settings.includeHashtags,
          post_format: settings.postFormat,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSettings.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating Mastodon settings:', error);
        return NextResponse.json(
          { error: 'Failed to update settings' },
          { status: 500 }
        );
      }
      result = data;
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from('mastodon_settings')
        .insert({
          enabled: settings.enabled,
          instance: settings.instance,
          access_token: settings.accessToken,
          auto_post_new: settings.autoPostNew,
          auto_post_updates: settings.autoPostUpdates,
          include_hashtags: settings.includeHashtags,
          post_format: settings.postFormat
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating Mastodon settings:', error);
        return NextResponse.json(
          { error: 'Failed to create settings' },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json({
      success: true,
      message: 'Settings saved successfully',
      settings: {
        enabled: result.enabled,
        instance: result.instance,
        accessToken: result.access_token,
        autoPostNew: result.auto_post_new,
        autoPostUpdates: result.auto_post_updates,
        includeHashtags: result.include_hashtags,
        postFormat: result.post_format
      }
    });

  } catch (error) {
    console.error('Error in POST /api/mastodon/settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 