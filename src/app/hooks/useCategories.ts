'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

interface UseCategoriesReturn {
  categories: BlogCategory[];
  loading: boolean;
  error: string | null;
  createCategory: (name: string) => Promise<BlogCategory | null>;
  deleteCategory: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/blog/api/categories'); // Correct endpoint for categories
      setCategories(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async (name: string): Promise<BlogCategory | null> => {
    try {
      const res = await axios.post('/blog/api/create', { name });
      const newCategory = res.data.category;
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
      return null;
    }
  };

  // Delete a category
  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/blog/api/create?id=${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    createCategory,
    deleteCategory,
    refetch: fetchCategories,
  };
};
