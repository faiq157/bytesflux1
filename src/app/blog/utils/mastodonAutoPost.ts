// This file is kept for backward compatibility but is no longer actively used.
// The Mastodon posting is now handled directly in the components using the API endpoints.

export interface MastodonSettings {
  enabled: boolean;
  instance: string;
  accessToken: string;
  autoPostNew: boolean;
  autoPostUpdates: boolean;
  includeHashtags: boolean;
  postFormat: string;
}

// Simple function to get Mastodon settings from database (for client-side use)
export async function getMastodonSettings(): Promise<MastodonSettings | null> {
  if (typeof window === 'undefined') return null;
  
  try {
    const response = await fetch('/blog/api/mastodon/settings');
    if (response.ok) {
      const data = await response.json();
      return data.settings || null;
    }
    return null;
  } catch (error) {
    console.error('Error loading Mastodon settings:', error);
    return null;
  }
} 