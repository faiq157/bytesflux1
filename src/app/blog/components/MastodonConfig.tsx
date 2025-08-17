'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  TestTube, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Home,
  MessageSquare
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const MastodonConfig: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [testMessage, setTestMessage] = useState('');

  const handleTestConnection = async () => {
    const instance = process.env.NEXT_PUBLIC_MASTODON_INSTANCE;
    const accessToken = process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN;

    if (!instance || !accessToken) {
      toast.error('Mastodon credentials not found in environment variables');
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    setTestMessage('');

    try {
      const response = await fetch('/blog/api/mastodon/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instance: instance,
          accessToken: accessToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResult('success');
        setTestMessage('Connection successful! Your Mastodon account is properly configured.');
        toast.success('Mastodon connection test successful!');
      } else {
        setTestResult('error');
        setTestMessage(data.error || 'Connection failed. Please check your environment variables.');
        toast.error('Mastodon connection test failed');
      }
    } catch (error) {
      setTestResult('error');
      setTestMessage('Network error. Please check your internet connection.');
      toast.error('Connection test failed');
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestPost = async () => {
    const instance = process.env.NEXT_PUBLIC_MASTODON_INSTANCE;
    const accessToken = process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN;

    if (!instance || !accessToken) {
      toast.error('Mastodon credentials not found in environment variables');
      return;
    }

    setIsTesting(true);
    setTestResult(null);
    setTestMessage('');

    try {
      const response = await fetch('/blog/api/mastodon/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instance: instance,
          accessToken: accessToken,
          status: '🚀 Test post from BytesFlux admin panel! This is a test to verify your Mastodon integration is working correctly. #BytesFlux #Test',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTestResult('success');
        setTestMessage('Test post successful! Check your Mastodon account to see the post.');
        toast.success('Test post sent successfully!');
      } else {
        setTestResult('error');
        setTestMessage(data.error || 'Test post failed. Please check your environment variables.');
        toast.error('Test post failed');
      }
    } catch (error) {
      setTestResult('error');
      setTestMessage('Network error. Please check your internet connection.');
      toast.error('Test post failed');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Home className="w-8 h-8 text-purple-600" />
                Mastodon Integration
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Automatic posting to Mastodon when you publish blog posts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Configuration Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Configuration Status
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div>
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Auto-Posting Active</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Mastodon integration is enabled and using environment variables
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Instance</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {process.env.NEXT_PUBLIC_MASTODON_INSTANCE || 'Not configured'}
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Access Token</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN ? '✓ Configured' : 'Not configured'}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Features</h4>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>✓ Auto-post new blog posts</li>
                  <li>✓ Auto-post updated blog posts</li>
                  <li>✓ Smart hashtag generation</li>
                  <li>✓ Optimized post format</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test Connection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <TestTube className="w-5 h-5 text-blue-600" />
              Test Integration
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  <TestTube className="w-4 h-4" />
                  Test Connection
                </button>
                
                <button
                  onClick={handleTestPost}
                  disabled={isTesting}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Test Post
                </button>
              </div>

              {/* Test Results */}
              {testResult && (
                <div className={`p-4 rounded-lg border ${
                  testResult === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                }`}>
                  <div className="flex items-start gap-3">
                    {testResult === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                    )}
                    <div>
                      <h4 className={`font-medium ${
                        testResult === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                      }`}>
                        {testResult === 'success' ? 'Test Successful' : 'Test Failed'}
                      </h4>
                      <p className={`text-sm ${
                        testResult === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                      }`}>
                        {testMessage}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isTesting && (
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Testing connection...
                </div>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 p-6">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              How It Works
            </h2>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <p>✅ <strong>Automatic:</strong> Every time you publish a blog post, it's automatically shared on Mastodon</p>
              <p>✅ <strong>No Configuration:</strong> Uses environment variables for instant setup</p>
              <p>✅ <strong>Smart Formatting:</strong> Automatically generates hashtags and optimized post format</p>
              <p>✅ <strong>Real-time:</strong> Posts are shared immediately when published</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MastodonConfig; 