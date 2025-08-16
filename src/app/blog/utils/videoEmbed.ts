// Utility function to convert video URLs to embed URLs
export function getVideoEmbedUrl(url: string): string {
  if (!url) return '';
  
  // YouTube
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    let videoId = '';
    
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Vimeo
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1].split('?')[0];
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }
  
  // Dailymotion
  if (url.includes('dailymotion.com/video/')) {
    const videoId = url.split('dailymotion.com/video/')[1].split('?')[0];
    if (videoId) {
      return `https://www.dailymotion.com/embed/video/${videoId}`;
    }
  }
  
  // Facebook
  if (url.includes('facebook.com/') && url.includes('/videos/')) {
    // Facebook videos need special handling - return original URL for now
    return url;
  }
  
  // Instagram
  if (url.includes('instagram.com/p/')) {
    const postId = url.split('instagram.com/p/')[1].split('?')[0];
    if (postId) {
      return `https://www.instagram.com/p/${postId}/embed/`;
    }
  }
  
  // If it's already an embed URL, return as is
  if (url.includes('/embed/')) {
    return url;
  }
  
  // For other platforms, return the original URL
  return url;
}

// Function to check if a URL is a valid video URL
export function isValidVideoUrl(url: string): boolean {
  if (!url) return false;
  
  const videoPlatforms = [
    'youtube.com',
    'youtu.be',
    'vimeo.com',
    'dailymotion.com',
    'facebook.com',
    'instagram.com'
  ];
  
  return videoPlatforms.some(platform => url.includes(platform));
}

// Function to get video platform name
export function getVideoPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
  if (url.includes('vimeo.com')) return 'Vimeo';
  if (url.includes('dailymotion.com')) return 'Dailymotion';
  if (url.includes('facebook.com')) return 'Facebook';
  if (url.includes('instagram.com')) return 'Instagram';
  return 'Video';
} 