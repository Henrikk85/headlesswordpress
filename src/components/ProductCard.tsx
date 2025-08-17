import React from 'react';
import { Product } from '../types/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartQuantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, cartQuantity }) => {
  const isOnSale = product.sale_price && product.sale_price !== product.regular_price;
  const displayPrice = product.sale_price || product.price;
  const isOutOfStock = product.stock_status === 'outofstock';

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAddToCart(product);
    }
  };

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="product-image">
        <img 
          src={product.images[0]?.src || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={product.images[0]?.alt || product.name}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        {isOnSale && <span className="sale-badge">Sale!</span>}
        {isOutOfStock && <span className="stock-badge">Out of Stock</span>}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.short_description || product.description.substring(0, 100) + '...'}
        </p>
        
        <div className="product-price">
          <span className="current-price">${displayPrice}</span>
          {isOnSale && (
            <span className="original-price">${product.regular_price}</span>
          )}
        </div>
        
        <div className="product-actions">
          <button 
            className={`btn ${isOutOfStock ? 'btn-secondary' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
          {cartQuantity > 0 && (
            <span className="cart-quantity">In cart: {cartQuantity}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
