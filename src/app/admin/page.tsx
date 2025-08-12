'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  Users, 
  BarChart3, 
  Sparkles, 
  BookOpen, 
  PenTool, 
  FileText, 
  MessageSquare, 
  Star, 
  Eye, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Tag,
  LogOut,
  Shield,
  Home
} from 'lucide-react';
import AdminBlog from '../blog/components/AdminBlog';
import { isAuthenticated, logoutAdmin, getAdminUsername } from '../lib/auth';
import { toast } from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    
    setUsername(getAdminUsername());
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  // Show loading while checking auth
  if (!username) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verifying Access</h3>
          <p className="text-gray-600 dark:text-gray-300">Checking admin credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Header */}
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
        {/* Background Pattern */}

        <div className="relative max-w-7xl mx-auto py-3">
          {/* Admin Header with Logout */}
          <div className="flex items-center justify-between  ">
            <button className='flex items-center gap-2 cursor-pointer' onClick={() => router.push('/')}>
              <Home className="w-5 h-5 cursor-pointer" /> 
                Back To Home
            </button>
            <div className="flex-shrink-0">
              <button
                onClick={handleLogout}
                className="group relative overflow-hidden border-2 border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 px-6 py-3 rounded-2xl font-semibold hover:border-red-500 dark:hover:border-red-500 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 hover:shadow-lg inline-flex items-center gap-3"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Content Management Panel
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Use the tools below to manage your blog posts, comments, and content. All changes are saved automatically.
            </p>
          </div>
          
          {/* AdminBlog Component */}
          <AdminBlog />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 