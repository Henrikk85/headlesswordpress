import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  getItemQuantity: (productId: number) => number;
  loading: boolean;
  error: string | null;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onAddToCart, 
  getItemQuantity, 
  loading, 
  error 
}) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error loading products: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="loading">No products available.</div>;
  }

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            cartQuantity={getItemQuantity(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
