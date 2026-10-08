'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import RatingStars from './RatingStars';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      <Link href={`/product/${product.id}`} className="block flex-1 p-5 flex flex-col">
        {/* Product Image */}
        <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute top-2.5 right-2.5 text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {product.category}
          </span>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-[#0b5cb5] transition-colors">
              {product.title}
            </h3>
            
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mt-1.5 flex items-center gap-1.5">
              <RatingStars rating={product.rating} size="sm" />
              <span className="text-xs text-gray-400">
                ({product.reviewCount})
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Button */}
      <div className="px-5 pb-5 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#0b63c5] hover:bg-[#094ea6] active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
