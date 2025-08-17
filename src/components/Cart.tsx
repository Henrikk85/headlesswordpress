import React from 'react';
import { Cart as CartType, CartItem } from '../types/Product';
import './Cart.css';

interface CartProps {
  cart: CartType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onClose,
  isOpen
}) => {
  if (!isOpen) return null;

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here. This is a demo application.');
  };

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-content">
          {cart.items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.items.map((item: CartItem) => (
                  <div key={item.product.id} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={item.product.images[0]?.src || 'https://via.placeholder.com/80x80?text=No+Image'} 
                        alt={item.product.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h4>{item.product.name}</h4>
                      <p className="item-price">
                        ${item.product.sale_price || item.product.price}
                      </p>
                      
                      <div className="quantity-controls">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-actions">
                      <button 
                        onClick={() => onRemoveItem(item.product.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                      <p className="item-total">
                        ${((parseFloat(item.product.sale_price || item.product.price)) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <h3>Total: ${cart.total.toFixed(2)}</h3>
                </div>
                
                <div className="cart-actions">
                  <button 
                    onClick={onClearCart}
                    className="btn btn-secondary"
                  >
                    Clear Cart
                  </button>
                  <button 
                    onClick={handleCheckout}
                    className="btn checkout-btn"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
