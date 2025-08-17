export interface Product {
  id: number;
  name: string;
  description: string;
  short_description?: string;
  price: string;
  regular_price: string;
  sale_price?: string;
  images: ProductImage[];
  categories: ProductCategory[];
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity?: number;
  sku?: string;
  permalink?: string;
}

export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media?: number;
  link: string;
  categories: number[];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}
