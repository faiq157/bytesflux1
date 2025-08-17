'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MDEditor from '@uiw/react-md-editor';
import { Upload, X, Eye, EyeOff, Save, ArrowLeft, BookOpen, Loader2, Video, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { BlogPost, CreateBlogPostData } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { isValidVideoUrl } from '../utils/videoEmbed';


const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  image: z.string().optional(),
  video_url: z.string().optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  seo: z.object({
    title: z.string().min(1, 'SEO title is required'),
    description: z.string().min(1, 'SEO description is required'),
    keywords: z.string().min(1, 'SEO keywords are required'),
    canonical: z.string().min(1, 'Canonical URL is required'),
    ogType: z.string().min(1, 'OG type is required'),
    structuredData: z.any(),
  }).optional(),
});

interface BlogPostFormProps {
  post?: BlogPost | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function BlogPostForm({ post, onSave, onCancel }: BlogPostFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(post?.image ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUrlError, setVideoUrlError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<CreateBlogPostData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      category: post?.category || '',
      tags: post?.tags || [],
      image: post?.image || '',
      video_url: post?.video_url || '',
      published: post?.published ?? false,
      featured: post?.featured ?? false,
      seo: {
        title: post?.seo?.title || '',
        description: post?.seo?.description || '',
        keywords: post?.seo?.keywords || '',
        canonical: post?.seo?.canonical || '',
        ogType: post?.seo?.ogType || 'article',
        structuredData: post?.seo?.structuredData || {},
      },
    },
    mode: 'onChange',
  });

  const watchedContent = watch('content');
  const watchedTitle = watch('title');
  const watchedVideoUrl = watch('video_url');

  useEffect(() => {
    if (post) {
      setIsEditing(true);
      setImagePreview(post.image || '');
      // Auto-generate SEO fields if they're empty
      if (!post.seo?.title && post.title) {
        setValue('seo.title', post.title);
      }
      if (!post.seo?.description && post.excerpt) {
        setValue('seo.description', post.excerpt);
      }
      if (!post.seo?.canonical) {
        setValue('seo.canonical', `${window.location.origin}/blog/${post.slug}`);
      }
    } else {
      // Set default values for new posts
      setValue('seo.ogType', 'article');
      setValue('seo.canonical', `${window.location.origin}/blog/new-post`);
    }
  }, [post, setValue]);

  // Validate video URL when it changes
  useEffect(() => {
    if (watchedVideoUrl && !isValidVideoUrl(watchedVideoUrl)) {
      setVideoUrlError('Please enter a valid video URL from YouTube, Vimeo, or other supported platforms');
    } else {
      setVideoUrlError('');
    }
  }, [watchedVideoUrl]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid image type. Only JPEG, PNG, WebP, and GIF are allowed.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'blog-images');

    try {
      const response = await fetch('/blog/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setValue('image', data.url);
        setImagePreview(data.url);
        toast.success('Image uploaded successfully');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setValue('image', '');
    setImagePreview('');
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !watch('tags').includes(tag.trim())) {
      setValue('tags', [...watch('tags'), tag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watch('tags').filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: CreateBlogPostData) => {
    if (isSubmitting) return;
    
    // Validate video URL before submission
    if (data.video_url && !isValidVideoUrl(data.video_url)) {
      setVideoUrlError('Please enter a valid video URL from YouTube, Vimeo, or other supported platforms');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Auto-generate missing SEO fields
      if (!data.seo?.title) {
        if (!data.seo) {
          data.seo = {
            title: '',
            description: '',
            keywords: '',
            canonical: '',
            ogType: 'article',
            structuredData: {}
          };
        }
        data.seo.title = data.title;
      }
      if (!data.seo?.description) {
        if (!data.seo) {
          data.seo = {
            title: '',
            description: '',
            keywords: '',
            canonical: '',
            ogType: 'article',
            structuredData: {}
          };
        }
        data.seo.description = data.excerpt;
      }
      if (!data.seo?.canonical) {
        if (!data.seo) {
          data.seo = {
            title: '',
            description: '',
            keywords: '',
            canonical: '',
            ogType: 'article',
            structuredData: {}
          };
        }
        data.seo.canonical = `${window.location.origin}/blog/${data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      }

      let url: string;
      let method: string;

      if (isEditing && post?.slug) {
        // Update existing post using slug route
        url = `/blog/api/${post.slug}`;
        method = 'PUT';
      } else {
        // Create new post
        url = '/blog/api/posts';
        method = 'POST';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Post ${isEditing ? 'updated' : 'created'} successfully`);
        
        // Check if social media platforms are enabled and post if so
        if (data.published) {
          try {
            // Check social media settings
            const settingsResponse = await fetch('/blog/api/social-media/settings');
            if (settingsResponse.ok) {
              const settingsData = await settingsResponse.json();
              
              // Post to Mastodon if enabled
              const mastodonSettings = settingsData.settings.find((s: any) => s.platform === 'mastodon');
              if (mastodonSettings?.enabled && mastodonSettings?.auto_post_new) {
                try {
                  const mastodonResponse = await fetch('/blog/api/mastodon/post', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      instance: process.env.NEXT_PUBLIC_MASTODON_INSTANCE || 'https://mastodon.social',
                      accessToken: process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN || '',
                      status: `New blog post: ${data.title}

${data.excerpt || data.content.substring(0, 200) + '...'}

Read more: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${result.slug || post?.slug || ''}

#${data.category.replace(/\s+/g, '')} #BytesFlux #TechBlog`,
                    }),
                  });

                  if (mastodonResponse.ok) {
                    const mastodonResult = await mastodonResponse.json();
                    toast.success('Post also shared on Mastodon! 🚀');
                    console.log('Mastodon post successful:', mastodonResult);
                  } else {
                    const error = await mastodonResponse.json();
                    console.log('Mastodon post failed:', error);
                  }
                } catch (error) {
                  console.error('Error posting to Mastodon:', error);
                }
              }
              

            }
          } catch (error) {
            console.error('Error checking social media settings:', error);
          }
        }
        
        // If creating a new post, update the form to editing mode
        if (!isEditing && result.slug) {
          setIsEditing(true);
          // Update the URL to reflect the new slug
          window.history.replaceState(null, '', `/admin/blog/edit/${result.slug}`);
        }
        
        onSave();
      } else {
        const error = await response.json();
        toast.error(error.error || `Failed to ${isEditing ? 'update' : 'create'} post`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} post`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isSubmitting) return;
    onCancel();
  };

  const handlePublishToggle = () => {
    const currentPublished = watch('published');
    setValue('published', !currentPublished);
    toast.success(`Post ${!currentPublished ? 'published' : 'unpublished'}`);
  };

  const handleShareToMastodon = async () => {
    try {
      const currentData = watch();
      
      // Call Mastodon API directly
      const mastodonResponse = await fetch('/blog/api/mastodon/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instance: process.env.NEXT_PUBLIC_MASTODON_INSTANCE || 'https://mastodon.social',
          accessToken: process.env.NEXT_PUBLIC_MASTODON_ACCESS_TOKEN || '',
          status: `New blog post: ${currentData.title}

${currentData.excerpt || currentData.content.substring(0, 200) + '...'}

Read more: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post?.slug || ''}

#${currentData.category.replace(/\s+/g, '')} #BytesFlux #TechBlog`,
        }),
      });

      if (mastodonResponse.ok) {
        const mastodonResult = await mastodonResponse.json();
        toast.success('Post shared on Mastodon! 🚀');
        console.log('Mastodon post successful:', mastodonResult);
      } else {
        const error = await mastodonResponse.json();
        console.log('Mastodon post failed:', error);
        toast.error('Failed to share on Mastodon');
      }
    } catch (error) {
      console.error('Error sharing to Mastodon:', error);
      toast.error('Failed to share on Mastodon');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {isEditing ? 'Update your blog post' : 'Write and publish a new blog post'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>

            {/* Publish Toggle Button */}
            <button
              type="button"
              onClick={handlePublishToggle}
              className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md transition-colors duration-200 ${
                watch('published')
                  ? 'border-green-300 dark:border-green-600 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {watch('published') ? 'Published' : 'Draft'}
            </button>

            {/* Share to Mastodon Button */}
            {watch('published') && (
              <button
                type="button"
                onClick={handleShareToMastodon}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-purple-300 dark:border-purple-600 shadow-sm text-sm font-medium rounded-md text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 disabled:opacity-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Share to Mastodon
              </button>
            )}

            {/* Main Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              onClick={handleSubmit(onSubmit)}
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Publish Post')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          placeholder="Enter post title"
                        />
                      )}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt *
                    </label>
                    <Controller
                      name="excerpt"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          placeholder="Enter post excerpt"
                        />
                      )}
                    />
                    {errors.excerpt && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.excerpt.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                            placeholder="e.g., Technology"
                          />
                        )}
                      />
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {watch('tags').map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add tag and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                        className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                      />
                      {errors.tags && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Content Editor with Real-time Preview */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Content</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Markdown Editor */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Markdown Editor
                      </label>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Word Count: {watch('content')?.split(/\s+/).filter(Boolean).length || 0}</span>
                        <span>•</span>
                        <span>Read Time: {Math.ceil((watch('content')?.split(/\s+/).filter(Boolean).length || 0) / 200)} min</span>
                      </div>
                    </div>
                    
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <MDEditor
                            value={field.value}
                            onChange={field.onChange}
                            height={500}
                            preview="edit"
                            hideToolbar={false}
                            className="border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden"
                            textareaProps={{
                              placeholder: "Start writing your blog post in Markdown...\n\n# Use headers for structure\n## Subheadings work too\n\n**Bold text** and *italic text* are supported.\n\n- Bullet points\n- Numbered lists\n\n[Links](https://example.com) and ![Images](image-url) work too.\n\n```\nCode blocks are supported\n```\n\n> Blockquotes for important information",
                              className: "font-mono text-sm leading-relaxed"
                            }}
                            previewOptions={{
                              className: "prose prose-sm max-w-none dark:prose-invert"
                            }}
                          />
                        </div>
                      )}
                    />
                    
                    {errors.content && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
                    )}
                    
                    {/* Markdown Tips */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-700/50">
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Markdown Tips
                      </h4>
                      <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                        <p><strong>Headers:</strong> # H1, ## H2, ### H3</p>
                        <p><strong>Text:</strong> **bold**, *italic*, `code`</p>
                        <p><strong>Lists:</strong> - bullet, 1. numbered</p>
                        <p><strong>Links:</strong> [text](url), ![alt](image-url)</p>
                        <p><strong>Code:</strong> ```language for blocks</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Real-time Preview */}
                  {showPreview && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Live Preview
                        </label>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Updates in real-time as you type
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-600 p-6 h-[500px] overflow-y-auto">
                        {watch('content') ? (
                          <div className="prose prose-lg max-w-none dark:prose-invert">
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{children}</h1>,
                                h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{children}</h2>,
                                h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{children}</h3>,
                                p: ({children}) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{children}</p>,
                                ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">{children}</ul>,
                                ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">{children}</ol>,
                                li: ({children}) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
                                blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-4">{children}</blockquote>,
                                code: ({children, className}) => {
                                  const isInline = !className;
                                  if (isInline) {
                                    return <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm font-mono">{children}</code>;
                                  }
                                  return (
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                                      <code className="text-gray-800 dark:text-gray-200 text-sm font-mono">{children}</code>
                                    </pre>
                                  );
                                },
                                a: ({href, children}) => <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>,
                                img: ({src, alt}) => <img src={src} alt={alt} className="max-w-full h-auto rounded-lg mb-4" />,
                                strong: ({children}) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
                                em: ({children}) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                                hr: () => <hr className="border-gray-300 dark:border-gray-600 my-6" />,
                                table: ({children}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border border-gray-300 dark:border-gray-600">{children}</table></div>,
                                th: ({children}) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-left font-semibold text-gray-900 dark:text-white">{children}</th>,
                                td: ({children}) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">{children}</td>,
                              }}
                            >
                              {watch('content')}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-medium">Start typing to see preview</p>
                            <p className="text-sm">Your markdown content will appear here in real-time</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Featured Image</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                      <Upload className="w-4 h-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="inline-flex items-center px-3 py-2 border border-red-300 dark:border-red-600 shadow-sm text-sm font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </button>
                    )}
                  </div>

                  {imagePreview && (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  )}

                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        placeholder="Or enter image URL directly"
                      />
                    )}
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image.message}</p>
                  )}
                </div>
              </div>

              {/* Video URL Field */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Video URL</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Video className="inline w-4 h-4 mr-2" />
                      Video URL (YouTube, Vimeo, etc.)
                    </label>
                    <Controller
                      name="video_url"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="url"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 ${
                            videoUrlError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      )}
                    />
                    {videoUrlError && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{videoUrlError}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Supports YouTube, Vimeo, Dailymotion, Facebook, and Instagram videos
                    </p>
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">SEO Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      SEO Title *
                    </label>
                    <Controller
                      name="seo.title"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          placeholder="SEO optimized title"
                        />
                      )}
                    />
                    {errors.seo?.title && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.seo.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      SEO Description *
                    </label>
                    <Controller
                      name="seo.description"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          placeholder="SEO description (150-160 characters)"
                        />
                      )}
                    />
                    {errors.seo?.description && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.seo.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      SEO Keywords *
                    </label>
                    <Controller
                      name="seo.keywords"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      )}
                    />
                    {errors.seo?.keywords && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.seo.keywords.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Publishing Options */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Publishing Options</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Controller
                      name="published"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Publish immediately
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Controller
                      name="featured"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                    <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Mark as featured post
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preview</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {watchedTitle || 'Post Title'}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {watch('excerpt') || 'Post excerpt will appear here...'}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{watch('category') || 'Category'}</span>
                      <span>•</span>
                      <span>{Math.ceil((watchedContent?.split(' ').length || 0) / 200)} min read</span>
                    </div>
                  </div>

                  {watch('image') && (
                    <div>
                      <img
                        src={watch('image')}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  )}

                  {watch('video_url') && (
                    <div>
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
                        <Video className="w-8 h-8 mx-auto text-gray-500 dark:text-gray-400 mb-2" />
                        <p className="text-xs text-gray-600 dark:text-gray-300">Video will be embedded</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-1">
                      {watch('tags').map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
