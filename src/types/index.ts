export type Category = 'All' | 'Electronics' | 'Clothing' | 'Home';

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'Electronics' | 'Clothing' | 'Home';
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  stock: number;
  isFeatured?: boolean;
  brand: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: Category;
  maxPrice: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'name-asc';
  brand?: string;
}
