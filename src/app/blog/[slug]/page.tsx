'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Eye, Star, Tag, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import SEOHead from '@/app/components/SEOHead';
import { BlogPost as BlogPostType, BlogComment } from '../types';
import { generateBlogPostSchema, generateBreadcrumbSchema } from '../../lib/seo';
import { useViewTracking } from '../../hooks/useViewTracking';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    postId: post?.id || '',
    initialViews: post?.views || 0
  });

  // Fetch blog post by slug
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/blog/api/posts?slug=${slug}`);
        const data = await response.json();
        
        if (data.posts && data.posts.length > 0) {
          const foundPost = data.posts[0];
          setPost(foundPost);
          
          // Track view after post is loaded
          if (foundPost.id) {
            trackView();
          }
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, trackView]);

  // Fetch comments when post is loaded
  useEffect(() => {
    if (post?.id) {
      fetchComments();
    }
  }, [post?.id]);

  // Fetch comments for this post
  const fetchComments = async () => {
    if (!post?.id) return;
    
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
        post_id: post!.id,
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

      if (response.ok) {
        toast.success('Comment submitted successfully!');
        setCommentAuthor('');
        setCommentEmail('');
        setNewComment('');
        fetchComments(); // Refresh comments
      } else {
        toast.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Submit rating
  const handleSubmitRating = async (rating: number) => {
    if (!post?.id) return;
    
    try {
      setSubmittingRating(true);
      
      const ratingData = {
        post_id: post.id,
        user_id: 'anonymous', // In a real app, this would be the logged-in user's ID
        rating: rating,
      };

      const response = await fetch('/blog/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });

      if (response.ok) {
        toast.success('Rating submitted successfully!');
        setUserRating(rating);
        setIsRatingSubmitted(true);
        // Refresh post data to get updated rating
        // You might want to implement a way to refresh the post data here
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

  // Share post
  const handleShare = async (platform: string) => {
    if (!post) return;
    
    const url = `${window.location.origin}/blog/${post.slug}`;
    const text = post.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Blog Post</h3>
          <p className="text-gray-600 dark:text-gray-300">Preparing your reading experience...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-red-900/20 dark:to-pink-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-6">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
          <button 
            onClick={() => router.push('/blog')} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <>
      <SEOHead
        title={post.seo?.title || post.title}
        description={post.seo?.description || post.excerpt}
        keywords={post.seo?.keywords || post.tags.join(', ')}
        canonical={`/blog/${post.slug}`}
        structuredData={[blogPostSchema, breadcrumbSchema]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        
        <main className="pt-20 pb-16">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={() => router.push('/blog')}
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </button>
            </div>

            {/* Header */}
            <header className="text-center mb-12">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 border border-blue-200/50 dark:border-blue-700/50">
                  {post.category}
                </span>
              </div>
               
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>
               
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                {post.excerpt}
              </p>
               
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.read_time || '5 min read'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{views} views</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-12">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mb-12">
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-strong:text-gray-900 prose-strong:dark:text-white prose-code:text-gray-800 prose-code:dark:text-gray-200 prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:dark:bg-gray-800 prose-pre:border prose-pre:border-gray-200 prose-pre:dark:border-gray-700">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" {...props} />,
                    h4: ({node, ...props}) => <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white" {...props} />,
                    h5: ({node, ...props}) => <h5 className="text-lg font-bold mb-2 text-gray-900 dark:text-white" {...props} />,
                    h6: ({node, ...props}) => <h6 className="text-base font-bold mb-2 text-gray-900 dark:text-white" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="mb-4 list-disc list-inside text-gray-700 dark:text-gray-300" {...props} />,
                    ol: ({node, ...props}) => <ol className="mb-4 list-decimal list-inside text-gray-700 dark:text-gray-300" {...props} />,
                    li: ({node, ...props}) => <li className="mb-2" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono" {...props} />,
                    pre: ({node, ...props}) => <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,
                    em: ({node, ...props}) => <em className="italic text-gray-700 dark:text-gray-300" {...props} />,
                    hr: ({node, ...props}) => <hr className="border-gray-300 dark:border-gray-600 my-8" {...props} />,
                    table: ({node, ...props}) => <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 mb-4" {...props} />,
                    th: ({node, ...props}) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold" {...props} />,
                    td: ({node, ...props}) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300" {...props} />,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rating Section */}
            <div className="mb-12 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rate this article:</h3>
              <div className="flex items-center gap-4 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleSubmitRating(star)}
                    disabled={submittingRating || isRatingSubmitted}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      userRating >= star
                        ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
                        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                    }`}
                  >
                    <Star className={`h-6 w-6 ${userRating >= star ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
              {post.rating && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Average rating: <span className="font-semibold">{post.rating.toFixed(1)}</span> 
                  {post.total_ratings && ` (${post.total_ratings} ratings)`}
                </p>
              )}
            </div>

            {/* Share Section */}
            <div className="mb-12 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Share this article:</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
                >
                  <Share2 className="h-4 w-4" />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  <Share2 className="h-4 w-4" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200"
                >
                  <Share2 className="h-4 w-4" />
                  LinkedIn
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Comments ({comments.length})
                </h3>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <MessageSquare className="h-4 w-4" />
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
              </div>

              {showComments && (
                <>
                  {/* Comment Form */}
                  <div className="mb-8 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave a Comment</h4>
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={commentAuthor}
                          onChange={(e) => setCommentAuthor(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Your Email *"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Your Comment *"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                        required
                      />
                      <button
                        type="submit"
                        disabled={submittingComment}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submittingComment ? 'Submitting...' : 'Submit Comment'}
                      </button>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No comments yet. Be the first to share your thoughts!
                      </p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {comment.author.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-semibold text-gray-900 dark:text-white">{comment.author}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(comment.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
