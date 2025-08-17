import { supabase } from '@/app/blog/utils/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  try {
    const { data: settings, error } = await supabase
      .from('social_media_settings')
      .select('*')
      .order('display_name');

    if (error) {
      console.error('Error fetching social media settings:', error);
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    return NextResponse.json({ settings: settings || [] });
  } catch (error) {
    console.error('Error in GET /api/social-media/settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { platform, enabled, auto_post_new, auto_post_updates } = await request.json();

    if (!platform) {
      return NextResponse.json({ error: 'Platform is required' }, { status: 400 });
    }

    // Update the specific platform settings
    const { data, error } = await supabase
      .from('social_media_settings')
      .update({
        enabled: enabled,
        auto_post_new: auto_post_new,
        auto_post_updates: auto_post_updates,
        updated_at: new Date().toISOString()
      })
      .eq('platform', platform)
      .select()
      .single();

    if (error) {
      console.error('Error updating social media settings:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      settings: data,
      message: `${data.display_name} settings updated successfully` 
    });
  } catch (error) {
    console.error('Error in POST /api/social-media/settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 