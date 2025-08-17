# Mastodon Auto-Posting Integration

This feature allows you to automatically post your blog content to Mastodon when you publish or update blog posts.

## Setup Instructions

### 1. Create a Mastodon App

1. Go to your Mastodon instance (e.g., https://mastodon.social)
2. Navigate to **Preferences → Development → New Application**
3. Give your app a name (e.g., "BytesFlux Blog")
4. Set the redirect URI to: `urn:ietf:wg:oauth:2.0:oob`
5. Select the **write:statuses** scope
6. Click "Submit"
7. Copy the access token

### 2. Configure the Integration

1. Go to your admin panel (`/admin`)
2. Click on the **Mastodon** tab
3. Enable auto-posting
4. Enter your Mastodon instance URL (e.g., https://mastodon.social)
5. Paste your access token
6. Configure posting options:
   - Auto-post new posts
   - Auto-post updates
   - Include hashtags
7. Customize the post format template
8. Click "Save Settings"

### 3. Test the Connection

1. Use the "Test Connection" button to verify your credentials
2. Use the "Send Test Post" button to send a test post to Mastodon

## Features

### Automatic Posting (Always Active)

- **Immediate Posting**: **Every time** you publish a post, it automatically calls both APIs:
  - ✅ Blog post API (saves to database)
  - ✅ Mastodon API (posts to Mastodon)
- **No Settings Required**: Works immediately with environment variables
- **Smart Hashtags**: Automatically generate hashtags from categories and tags
- **Custom Format**: Uses optimized post format for Mastodon

### Manual Sharing

- **Share Button**: Manual "Share to Mastodon" button for published posts
- **Form Integration**: Share button in blog post editor
- **Admin Panel**: Share button in blog management list
- **Toggle Publishing**: Publishing/unpublishing posts also triggers Mastodon API

### Post Format Template

The default template includes these placeholders:
- `{title}` - Blog post title
- `{excerpt}` - Blog post excerpt
- `{url}` - Link to the blog post
- `{hashtags}` - Generated hashtags
- `{author}` - Author name
- `{category}` - Post category

### Example Post Format

```
New blog post: {title}

{excerpt}

Read more: {url}

{hashtags}
```

## Security Notes

- Your Mastodon access token is stored locally in your browser
- Never share your access token publicly
- The token only has permission to post statuses
- You can revoke the token from your Mastodon app settings at any time

## Troubleshooting

### Common Issues

1. **"Connection failed" error**
   - Verify your instance URL is correct
   - Check that your access token is valid
   - Ensure your app has the correct permissions

2. **"Failed to post" error**
   - Check if your post content exceeds Mastodon's 500 character limit
   - Verify your instance is accessible
   - Check your Mastodon app permissions

3. **Posts not appearing**
   - Check if auto-posting is enabled
   - Verify your posting options are configured correctly
   - Check the browser console for any errors

### Getting Help

If you continue to have issues:
1. Check the browser console for error messages
2. Verify your Mastodon app settings
3. Test with a simple post first
4. Ensure your instance allows external API access

## API Endpoints

The integration uses these internal API endpoints:

- `POST /blog/api/mastodon/test` - Test connection
- `POST /blog/api/mastodon/post` - Post to Mastodon

## Environment Variables

Create a `.env.local` file with:

```env
# Mastodon Configuration
NEXT_PUBLIC_MASTODON_INSTANCE=https://mastodon.social
NEXT_PUBLIC_MASTODON_ACCESS_TOKEN=FH7vP-PmWw5KtjK46q50nTxg_sFTvdSSSgMzhCfKmfI

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Privacy and Compliance

- Posts are only sent when you explicitly publish or update content
- No personal data is shared beyond what you post
- You have full control over when and what gets posted
- You can disable auto-posting at any time 