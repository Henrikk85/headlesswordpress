import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/wordpressApi';
import './CategorySidebar.css';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface CategorySidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (categorySlug: string | null) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ selectedCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="category-sidebar">
        <div className="sidebar-header">
          <h3>Categories</h3>
        </div>
        <div className="loading-categories">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="category-sidebar">
      <div className="sidebar-header">
        <h3>Product Categories</h3>
      </div>
      
      <div className="category-list">
        <button
          className={`category-item ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          <span className="category-name">All Products</span>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${selectedCategory === category.slug ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.slug)}
          >
            <span className="category-name">{category.name}</span>
            <span className="category-count">({category.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
