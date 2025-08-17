import { Product, WordPressPost } from '../types/Product';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://autopedant.ee/wp-json';
const CONSUMER_KEY = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;

const demoProducts: Product[] = [
  {
    id: 1,
    name: "Premium Car Wax",
    description: "High-quality car wax for ultimate protection and shine. Perfect for maintaining your vehicle's appearance.",
    short_description: "Premium car wax for ultimate protection",
    price: "29.99",
    regular_price: "29.99",
    images: [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        name: "Premium Car Wax",
        alt: "Premium Car Wax bottle"
      }
    ],
    categories: [
      { id: 1, name: "Car Care", slug: "car-care" }
    ],
    stock_status: 'instock',
    stock_quantity: 50,
    sku: "PCW-001"
  },
  {
    id: 2,
    name: "Microfiber Cleaning Cloths",
    description: "Set of 6 premium microfiber cloths for streak-free cleaning. Safe for all surfaces including paint, glass, and interior.",
    short_description: "Set of 6 premium microfiber cloths",
    price: "19.99",
    regular_price: "24.99",
    sale_price: "19.99",
    images: [
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=400",
        name: "Microfiber Cloths",
        alt: "Stack of microfiber cleaning cloths"
      }
    ],
    categories: [
      { id: 1, name: "Car Care", slug: "car-care" },
      { id: 2, name: "Accessories", slug: "accessories" }
    ],
    stock_status: 'instock',
    stock_quantity: 100,
    sku: "MFC-006"
  },
  {
    id: 3,
    name: "Tire Shine Spray",
    description: "Professional-grade tire shine spray that provides long-lasting gloss and protection against UV rays and cracking.",
    short_description: "Professional tire shine spray",
    price: "15.99",
    regular_price: "15.99",
    images: [
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
        name: "Tire Shine Spray",
        alt: "Tire shine spray bottle"
      }
    ],
    categories: [
      { id: 1, name: "Car Care", slug: "car-care" },
      { id: 3, name: "Tire Care", slug: "tire-care" }
    ],
    stock_status: 'instock',
    stock_quantity: 75,
    sku: "TSS-001"
  },
  {
    id: 4,
    name: "Interior Cleaner",
    description: "All-purpose interior cleaner safe for leather, vinyl, plastic, and fabric surfaces. Removes dirt and stains effectively.",
    short_description: "All-purpose interior cleaner",
    price: "22.99",
    regular_price: "22.99",
    images: [
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
        name: "Interior Cleaner",
        alt: "Interior cleaner spray bottle"
      }
    ],
    categories: [
      { id: 1, name: "Car Care", slug: "car-care" },
      { id: 4, name: "Interior", slug: "interior" }
    ],
    stock_status: 'instock',
    stock_quantity: 30,
    sku: "IC-001"
  }
];

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      console.log('WooCommerce API credentials not configured, using demo products');
      return demoProducts;
    }

    const authString = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    const response = await fetch(`${API_BASE_URL}/wc/v3/products`, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.status === 401) {
      console.log('WooCommerce API authentication failed, using demo products');
      return demoProducts;
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    console.log('Successfully fetched products from WooCommerce API:', products.length);
    return products;
  } catch (error) {
    console.error('Error fetching products from WooCommerce API:', error);
    console.log('Falling back to demo products');
    return demoProducts;
  }
};

export const fetchWordPressPosts = async (): Promise<WordPressPost[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/wp/v2/posts?per_page=10`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
};

export const convertPostToProduct = (post: WordPressPost): Product => {
  return {
    id: post.id,
    name: post.title.rendered,
    description: post.content.rendered.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
    short_description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
    price: "25.99",
    regular_price: "25.99",
    images: [
      {
        id: post.id,
        src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        name: post.title.rendered,
        alt: post.title.rendered
      }
    ],
    categories: [
      { id: 1, name: "Car Care", slug: "car-care" }
    ],
    stock_status: 'instock',
    stock_quantity: 10,
    sku: `POST-${post.id}`,
    permalink: post.link
  };
};
