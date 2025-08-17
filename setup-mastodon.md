# Multi-Platform Social Media Integration Guide (Modern OIDC)

## Quick Setup (Simplified)

### 1. Environment Variables

Create a `.env.local` file in your project root with:

```env
# Mastodon Configuration
NEXT_PUBLIC_MASTODON_INSTANCE=https://mastodon.social
NEXT_PUBLIC_MASTODON_ACCESS_TOKEN=FH7vP-PmWw5KtjK46q50nTxg_sFTvdSSSgMzhCfKmfI


# Configure Client ID and Secret in the admin panel

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Database Setup

Run this SQL in your Supabase SQL editor to create the required tables:

```sql
-- Create social_media_settings table for multiple platforms
CREATE TABLE IF NOT EXISTS social_media_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    platform VARCHAR(50) NOT NULL UNIQUE,
    enabled BOOLEAN DEFAULT FALSE,
    display_name VARCHAR(100) NOT NULL,
    config JSONB NOT NULL DEFAULT '{}',
    auto_post_new BOOLEAN DEFAULT TRUE,
    auto_post_updates BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default Mastodon configuration
INSERT INTO social_media_settings (platform, enabled, display_name, config, auto_post_new, auto_post_updates) 
VALUES (
    'mastodon', 
    TRUE, 
    'Mastodon', 
    '{"instance": "https://mastodon.social", "access_token": "", "include_hashtags": true, "post_format": "New blog post: {title}\n\n{excerpt}\n\nRead more: {url}\n\n{hashtags}"}',
    TRUE, 
    TRUE
) ON CONFLICT (platform) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_social_media_settings_enabled ON social_media_settings(enabled);
CREATE INDEX IF NOT EXISTS idx_social_media_settings_platform ON social_media_settings(platform);
```

### 3. Restart Your Development Server

```bash
npm run dev
```

### 4. Configure Social Media Settings

1. Go to `/admin` → **Social Media** tab
2. Toggle Mastodon on/off as needed
3. Configure auto-posting options:
   - ✅ **New Posts**: Auto-post when publishing new posts
   - ✅ **Updates**: Auto-post when updating existing posts

## How It Works

1. **Smart Auto-Posting**: Only enabled platforms will auto-post
2. **Granular Control**: Enable/disable specific features per platform
3. **Real-time Updates**: Settings are saved immediately to database
4. **Fallback Handling**: Blog posts save successfully even if social media fails

## Features

✅ **Platform Toggles** - Enable/disable each social media platform  
✅ **Feature Control** - Toggle auto-posting for new posts and updates  
✅ **Real-time Settings** - Changes take effect immediately  
✅ **Database Storage** - Settings persisted in Supabase  
✅ **Error Handling** - Graceful fallback if social media fails  
✅ **Extensible** - Easy to add new platforms in the future  

## Admin Panel Tabs

### 📝 **Posts Tab**
- View and manage all blog posts
- Publish/unpublish posts
- Auto-posting happens here based on settings

### 🐘 **Mastodon Tab**
- Test Mastodon connection
- Send test posts
- View configuration status

### 🌐 **Social Media Tab**
- **NEW!** Enable/disable platforms
- Configure auto-posting options
- Manage multiple social media accounts

## Testing

1. Go to `/admin` → **Social Media** tab
2. Toggle platforms on/off as needed
3. Configure auto-posting options
4. Publish a blog post to test auto-posting
5. Check your social media accounts for the posts



## Adding New Platforms

The system is designed to easily add new social media platforms.

### Currently Supported:
- ✅ **Mastodon**: Fully implemented with instance support

### To Add More Platforms (e.g., Twitter):

1. **Add platform to database**:
```sql
INSERT INTO social_media_settings (platform, enabled, display_name, config, auto_post_new, auto_post_updates) 
VALUES ('twitter', FALSE, 'Twitter', '{}', TRUE, FALSE);
```

2. **Create API endpoints** for the new platform:
   - `/blog/api/twitter/test` - Test connection
   - `/blog/api/twitter/post` - Create posts

3. **Update the posting logic** in `BlogPostForm.tsx` and `AdminBlog.tsx`

4. **Add platform-specific icons** and colors in `SocialMediaSettings.tsx`

## Troubleshooting

- **Check database tables** are created correctly
- **Verify environment variables** are set
- **Test connection** in Mastodon tab
- **Check browser console** for any errors
- **Restart dev server** after database changes

## Post Format

```
New blog post: [Title]

[Excerpt]

Read more: [URL]

#[Category] #BytesFlux #TechBlog
```

## Security

- Access tokens stored in environment variables
- Database stores only configuration settings
- No sensitive data exposed to client-side
- Settings require admin access 