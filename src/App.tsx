import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useCart } from './hooks/useCart';
import { fetchProducts } from './services/wordpressApi';
import { Product } from './types/Product';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getItemQuantity } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <Header 
        cartItemCount={cart.itemCount} 
        onCartClick={toggleCart}
      />
      
      <main className="main-content">
        <div className="hero-section">
          <div className="container">
            <h1>Premium Car Care Products</h1>
            <p>Discover our collection of high-quality car care products from Autopedant</p>
          </div>
        </div>
        
        <ProductList
          products={products}
          onAddToCart={handleAddToCart}
          getItemQuantity={getItemQuantity}
          loading={loading}
          error={error}
        />
      </main>
      
      <Cart
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
      />
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Autopedant. All rights reserved.</p>
          <p>Powered by WordPress REST API</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
