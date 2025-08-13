'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MessageSquare, Calendar, Clock, User, Eye, Star, Tag, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost as BlogPostType, BlogComment } from '../types';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '../../lib/seo';
import { useViewTracking } from '../../hooks/useViewTracking';
import Head from 'next/head';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: { post: BlogPostType }) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

  // Initialize view tracking
  const { views, trackView, isLoading: viewsLoading } = useViewTracking({
    postId: post.id,
    initialViews: post.views || 0
  });

  // Track view when component mounts
  useEffect(() => {
    trackView();
  }, [trackView]);

  // Generate SEO schema markup
  const blogPostSchema = generateBlogPostSchema({
    title: post.title,
    description: post.excerpt,
    content: post.content,
    author: post.author,
    authorId: post.author_id,
    date: post.date,
    image: post.image || undefined,
    category: post.category,
    tags: post.tags,
    slug: post.slug,
    views: post.views || 0,
    rating: post.rating || 0,
    totalRatings: post.total_ratings || 0
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.category, url: `/blog?category=${post.category}` },
    { name: post.title, url: `/blog/${post.slug}` }
  ]);

  // Fetch comments when component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  // Fetch comments for this post
  const fetchComments = async () => {
    try {
      const response = await fetch(`/blog/api/comments?postId=${post.id}`);
      const data = await response.json();
      
      if (data.comments) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to fetch comments');
    }
  };

  // Submit a new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentAuthor.trim() || !commentEmail.trim() || !newComment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setSubmittingComment(true);
      
      const commentData = {
        post_id: post.id,
        author: commentAuthor.trim(),
        email: commentEmail.trim(),
        content: newComment.trim(),
      };

      const response = await fetch('/blog/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success('Comment submitted successfully!');
        setCommentAuthor('');
        setCommentEmail('');
        setNewComment('');
        
        // Refresh comments to show the new one
        await fetchComments();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const fetchUserRating = async () => {
    try {
      // In a real app, you'd get the user ID from auth context
      const userId = 'anonymous'; // This should come from your auth system
      const response = await fetch(`/blog/api/ratings?post_id=${post.id}&user_id=${userId}`);
      const data = await response.json();
      
      if (data.userRating) {
        setUserRating(data.userRating);
      }
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const handleRating = async (rating: number) => {
    try {
      setSubmittingRating(true);
      const userId = 'anonymous'; // This should come from your auth system
      
      const response = await fetch('/blog/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post.id,
          user_id: userId,
          rating,
        }),
      });

      if (response.ok) {
        setUserRating(rating);
        toast.success('Rating submitted successfully');
        // Refresh the page to get updated rating stats
        window.location.reload();
      } else {
        toast.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating');
    } finally {
      setSubmittingRating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
  return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onStarClick?.(star)}
            disabled={!interactive || submittingRating}
            className={`${
              interactive ? 'cursor-pointer hover:scale-110 transition-transform duration-200' : 'cursor-default'
            } ${
              submittingRating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {viewsLoading ? (
        <div className="text-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Amazing Content</h3>
          <p className="text-gray-600 dark:text-gray-300">Preparing your reading experience...</p>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative mb-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl"></div>
            
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50">
              {post.category}
            </span>
          </div>

          {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            {post.title}
          </h1>

              {/* Excerpt */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl">
                {post.excerpt}
              </p>

              {/* Enhanced Meta Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Published</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(post.date)}</p>
            </div>
            </div>
                
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Views</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{views}</p>
            </div>
          </div>

                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Comments</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Enhanced Rating Display */}
              {(post.rating || 0) > 0 && (
                <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50">
                  <div className="flex items-center gap-3">
                    {renderStars(post.rating || 0)}
                    <div>
                      <p className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                        {(post.rating || 0).toFixed(1)} out of 5
                      </p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        {post.total_ratings || 0} ratings
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={sharePost}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Share Article
            </button>
                
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {showComments ? 'Hide Comments' : `View Comments (${comments.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
          {post.image && (
            <div className="mb-12">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={post.image}
              alt={post.title}
                  className="w-full h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
            />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      )}

          {/* Enhanced Content Section with Production Markdown Rendering */}
          <div className="relative mb-16">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0 border-b border-gray-200 dark:border-gray-600 pb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 mt-8 first:mt-0">{children}</h2>,
                    h3: ({children}) => <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 mt-6 first:mt-0">{children}</h3>,
                    h4: ({children}) => <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6 first:mt-0">{children}</h4>,
                    h5: ({children}) => <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-4 first:mt-0">{children}</h5>,
                    h6: ({children}) => <h6 className="text-base font-bold text-gray-900 dark:text-white mb-2 mt-4 first:mt-0">{children}</h6>,
                    p: ({children}) => <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300 text-lg">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300 text-lg">{children}</ol>,
                    li: ({children}) => <li className="text-gray-700 dark:text-gray-300 leading-relaxed">{children}</li>,
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400 mb-6 bg-blue-50 dark:bg-blue-900/20 py-4 rounded-r-lg">
                        <div className="text-lg leading-relaxed">{children}</div>
                      </blockquote>
                    ),
                    code: ({children, className}) => {
                      const isInline = !className;
                      if (isInline) {
                        return <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono border border-gray-200 dark:border-gray-600">{children}</code>;
                      }
                      return (
                        <div className="mb-6">
                          <div className="bg-gray-900 dark:bg-gray-800 rounded-t-lg px-4 py-2 border-b border-gray-700 dark:border-gray-600">
                            <span className="text-gray-400 text-sm font-mono">Code Block</span>
                          </div>
                          <pre className="bg-gray-900 dark:bg-gray-800 p-4 rounded-b-lg overflow-x-auto">
                            <code className="text-gray-100 text-sm font-mono leading-relaxed">{children}</code>
                          </pre>
          </div>
                      );
                    },
                    a: ({href, children}) => (
                      <a 
                        href={href} 
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    img: ({src, alt}) => (
                      <div className="my-8 text-center">
                        <img 
                          src={src} 
                          alt={alt} 
                          className="max-w-full h-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 mx-auto" 
                        />
                        {alt && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">{alt}</p>
                        )}
            </div>
                    ),
                    strong: ({children}) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
                    em: ({children}) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                    hr: () => <hr className="border-gray-300 dark:border-gray-600 my-8" />,
                    table: ({children}) => (
                      <div className="overflow-x-auto mb-6 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">{children}</table>
          </div>
                    ),
                    thead: ({children}) => <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>,
                    tbody: ({children}) => <tbody className="divide-y divide-gray-300 dark:divide-gray-600 bg-white dark:bg-gray-800">{children}</tbody>,
                    th: ({children}) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-300 dark:border-gray-600">{children}</th>,
                    td: ({children}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">{children}</td>,
                    tr: ({children}) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">{children}</tr>,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Enhanced Rating Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-blue-200/50 dark:border-blue-700/50">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Rate this post</h3>
                <p className="text-gray-600 dark:text-gray-300">Share your thoughts and help others discover great content</p>
        </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Your rating:</span>
                  {renderStars(userRating || 0, true, handleRating)}
                </div>
                {userRating && (
                  <div className="bg-white/80 dark:bg-gray-800/80 px-6 py-3 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                    <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      You rated this {userRating} out of 5
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Enhanced Comments Section */}
          <div className="relative mb-16">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              {/* Comments Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Comments ({comments.length})
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join the conversation and share your thoughts
                  </p>
                </div>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  {showComments ? 'Hide Form' : 'Add Comment'}
                </button>
              </div>

              {/* Comment Form */}
              {showComments && (
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Leave a Comment
                  </h4>
                  <form onSubmit={handleSubmitComment} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="Your name"
                          required
                        />
        </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                          placeholder="your.email@example.com"
                          required
                        />
            </div>
          </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Comment *
                      </label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                        placeholder="Share your thoughts on this article..."
                        required
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Your comment will appear immediately after submission
                      </p>
                      <button
                        type="submit"
                        disabled={submittingComment}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {submittingComment ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4" />
                            Submit Comment
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No comments yet
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Be the first to share your thoughts on this article!
                    </p>
                    <button
                      onClick={() => setShowComments(true)}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Add Comment
                    </button>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {comment.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h5 className="font-semibold text-gray-900 dark:text-white">
                              {comment.author}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(comment.date)}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                      
                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 ml-14 space-y-4">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-white font-semibold text-xs">
                                    {reply.author.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h6 className="font-medium text-gray-900 dark:text-white text-sm">
                                      {reply.author}
                                    </h6>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatDate(reply.date)}
                                    </span>
                                  </div>
                                  
                                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {reply.content}
                                  </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
                      )}
                    </div>
                  ))
                )}
        </div>
      </div>
    </div>
        </>
      )}
    </article>
    </>
  );
}