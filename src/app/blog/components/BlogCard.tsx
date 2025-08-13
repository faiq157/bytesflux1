import React from 'react';
import { Calendar, Clock, Eye, MessageCircle, ArrowRight, Tag, Star, TrendingUp, BookOpen, MessageSquare } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
    <article 
      className="group relative bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 overflow-hidden cursor-pointer border border-gray-100/50 dark:border-gray-600/50"
      onClick={() => onClick(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(post);
        }
      }}
      aria-label={`Read full article: ${post.title}`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Featured Badge */}
      {post.featured && (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-75"></div>
            <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
        {post.image ? (
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl text-gray-300 dark:text-gray-500 group-hover:scale-110 transition-transform duration-500">📝</div>
          </div>
        )}
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
        
        {/* Category Badge on Image */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {post.category}
            </span>
          </div>
        </div>

        {/* Reading Time Badge */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-black/70 dark:bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-xl text-white text-xs font-medium flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {post.read_time}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative p-8">
        {/* Tags Row */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 leading-tight">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed text-base">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-xl">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{post.read_time}</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-xl">
            <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300 transition-all duration-300">
              {post.views || 0}
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-xl">
            <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                      {post.comments || 0} {(post.comments || 0) === 1 ? 'comment' : 'comments'}
            </span>
          </div>
          
          {(post.rating || 0) > 0 && (
            <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-xl">
              <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{(post.rating || 0).toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Enhanced Read More Button */}
        <div className="pt-4 border-t border-gray-200/50 dark:border-gray-600/50">
          <div className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-0.5">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl px-6 py-3 transition-all duration-300 group-hover/btn:bg-transparent">
              <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 font-semibold group-hover/btn:text-white transition-colors duration-300">
                <span>Read Full Article</span>
                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-300/50 dark:group-hover:border-blue-600/50 transition-all duration-500 pointer-events-none"></div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-700 pointer-events-none"></div>
      
      {/* Floating Elements Animation */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-1000 delay-100"></div>
        <div className="absolute top-32 right-16 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-1000 delay-200"></div>
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-1000 delay-300"></div>
      </div>
    </article>
  );
};

export default BlogCard;