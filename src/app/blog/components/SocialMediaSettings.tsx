'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  CheckCircle,
  Clock,
  MessageSquare,
  Share2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface SocialMediaPlatform {
  id: string;
  platform: string;
  enabled: boolean;
  display_name: string;
  config: any;
  auto_post_new: boolean;
  auto_post_updates: boolean;
  created_at: string;
  updated_at: string;
}

const SocialMediaSettings: React.FC = () => {
  const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const response = await fetch('/blog/api/social-media/settings');
      if (response.ok) {
        const data = await response.json();
        setPlatforms(data.settings || []);
      } else {
        toast.error('Failed to load social media settings');
      }
    } catch (error) {
      console.error('Error fetching platforms:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlatform = async (platform: SocialMediaPlatform, field: 'enabled' | 'auto_post_new' | 'auto_post_updates') => {
    setUpdating(platform.platform);
    
    try {
      const updatedPlatform = {
        ...platform,
        [field]: !platform[field]
      };

      const response = await fetch('/blog/api/social-media/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: platform.platform,
          enabled: updatedPlatform.enabled,
          auto_post_new: updatedPlatform.auto_post_new,
          auto_post_updates: updatedPlatform.auto_post_updates,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setPlatforms(prev => 
          prev.map(p => 
            p.platform === platform.platform 
              ? { ...p, [field]: !p[field] }
              : p
          )
        );
        
        const action = field === 'enabled' 
          ? (updatedPlatform[field] ? 'enabled' : 'disabled')
          : field === 'auto_post_new'
          ? (updatedPlatform[field] ? 'enabled auto-posting for new posts' : 'disabled auto-posting for new posts')
          : (updatedPlatform[field] ? 'enabled auto-posting for updates' : 'disabled auto-posting for updates');
          
        toast.success(`${platform.display_name} ${action}`);
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating platform:', error);
      toast.error('Failed to update settings');
    } finally {
      setUpdating(null);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'mastodon':
        return <MessageSquare className="w-5 h-5" />;
      case 'twitter':
        return <Share2 className="w-5 h-5" />;

      default:
        return <Share2 className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'mastodon':
        return 'purple';
      case 'twitter':
        return 'blue';

      default:
        return 'gray';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-6"></div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Social Media Settings</h3>
        <p className="text-gray-600 dark:text-gray-300">Fetching your social media configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-600" />
          Social Media Auto-Posting
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure which social media platforms should automatically post when you publish or update blog posts
        </p>
      </div>

      {/* Platform Settings */}
      <div className="space-y-6">
        {platforms.map((platform) => {
          const color = getPlatformColor(platform.platform);
          const colorClasses = {
            purple: 'border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20',
            blue: 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20',
            indigo: 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20',
            gray: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20'
          };

          return (
            <div
              key={platform.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${colorClasses[color as keyof typeof colorClasses]} p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-800/50`}>
                    {getPlatformIcon(platform.platform)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {platform.display_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {platform.enabled ? 'Auto-posting is active' : 'Auto-posting is disabled'}
                    </p>
                  </div>
                </div>
                
                {/* Main Toggle */}
                <button
                  onClick={() => handleTogglePlatform(platform, 'enabled')}
                  disabled={updating === platform.platform}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2 ${
                    platform.enabled ? `bg-${color}-600` : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      platform.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                  {platform.enabled ? (
                    <ToggleRight className="absolute right-1 w-3 h-3 text-white" />
                  ) : (
                    <ToggleLeft className="absolute left-1 w-3 h-3 text-gray-400" />
                  )}
                </button>
              </div>

              {platform.enabled && (
                <div className="space-y-4">
                  {/* Auto-posting Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">New Posts</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Auto-post when publishing new posts</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTogglePlatform(platform, 'auto_post_new')}
                        disabled={updating === platform.platform}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          platform.auto_post_new ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            platform.auto_post_new ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Updates</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Auto-post when updating posts</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTogglePlatform(platform, 'auto_post_updates')}
                        disabled={updating === platform.platform}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          platform.auto_post_updates ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            platform.auto_post_updates ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
                    <span>
                      {platform.auto_post_new && platform.auto_post_updates 
                        ? 'Will post for new posts and updates'
                        : platform.auto_post_new 
                        ? 'Will post for new posts only'
                        : platform.auto_post_updates 
                        ? 'Will post for updates only'
                        : 'No auto-posting configured'
                      }
                    </span>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {updating === platform.platform && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Updating settings...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          How Auto-Posting Works
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>✅ <strong>Enabled Platforms:</strong> Only enabled platforms will auto-post</p>
          <p>✅ <strong>New Posts:</strong> Automatically share when publishing new blog posts</p>
          <p>✅ <strong>Updates:</strong> Automatically share when updating existing posts</p>
          <p>✅ <strong>Smart Control:</strong> Toggle individual features on/off as needed</p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSettings; 