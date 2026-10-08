'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import RatingStars from './RatingStars';
import { ShoppingBag } from 'lucide-react';

interface FeaturedProductCardProps {
  product: Product;
}

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden md:col-span-2 flex flex-col sm:flex-row group">
      {/* Smartphone Image on Left */}
      <Link
        href={`/product/${product.id}`}
        className="sm:w-1/2 bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-72 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Details on Right (matching screenshot: Title, Price, Stars, Description, Category, Add to Cart) */}
      <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#0b5cb5] transition-colors">
              {product.title}
            </h3>
          </Link>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <RatingStars rating={product.rating} size="md" />
            <span className="text-xs font-semibold text-gray-500">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3">
            {product.description}
          </p>

          <div className="mt-4 text-xs font-medium text-gray-500">
            <span className="font-semibold text-gray-700">Category: </span>
            <span>{product.category}</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-[#0b63c5] hover:bg-[#094ea6] active:scale-[0.98] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 text-base shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
