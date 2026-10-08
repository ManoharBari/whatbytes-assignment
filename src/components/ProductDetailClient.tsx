'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RatingStars from '@/components/RatingStars';
import ProductCard from '@/components/ProductCard';
import ToastContainer from '@/components/ToastContainer';
import { Product, ProductReview } from '@/types';
import { useCart } from '@/context/CartContext';
import {
  ChevronRight,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  MessageSquarePlus,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  initialReviews: ProductReview[];
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  initialReviews,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(initialReviews);

  // New review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      userName: newReviewName.trim(),
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setNewReviewName('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  const handleQuantityMinus = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleQuantityPlus = () => {
    setQuantity((q) => Math.min(product.stock, q + 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-[#0b5cb5] transition font-medium">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href={`/?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#0b5cb5] transition font-medium"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Main Product Layout: 2 Columns (Image Gallery Left, Details Right) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Image Gallery / Carousel Section */}
            <div className="flex flex-col gap-4">
              {/* Active Large Image */}
              <div className="relative aspect-square w-full rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center p-8 group">
                <img
                  src={product.images[activeImageIndex] || product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-emerald-500/10 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Stock ({product.stock} left)
                </span>
              </div>

              {/* Thumbnails Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 p-2 border-2 transition-all cursor-pointer shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-[#0b5cb5] ring-2 ring-[#0b5cb5]/20'
                          : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} view ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details Section */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b5cb5] bg-blue-50 px-2.5 py-1 rounded-md">
                    {product.brand}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    Category: {product.category}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
                  {product.title}
                </h1>

                {/* Rating & Reviews */}
                <div className="mt-3 flex items-center gap-3">
                  <RatingStars rating={product.rating} size="md" showNumber />
                  <span className="text-gray-300">|</span>
                  <a
                    href="#reviews"
                    className="text-sm font-semibold text-[#0b5cb5] hover:underline"
                  >
                    {reviewsList.length} customer reviews
                  </a>
                </div>

                {/* Pricing */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="text-xs font-bold bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full border border-rose-100">
                        Save ${product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="mt-6 text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                      Key Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-gray-600">
                      {product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0b5cb5] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Purchase Controls (Quantity & CTA buttons) */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-5">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-bold text-gray-800">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={handleQuantityMinus}
                      disabled={quantity <= 1}
                      className="p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-900 select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={handleQuantityPlus}
                      disabled={quantity >= product.stock}
                      className="p-2.5 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    Max: {product.stock} units
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#0b63c5] hover:bg-[#094ea6] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-[#073c77] hover:bg-[#052e5d] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base cursor-pointer"
                  >
                    <Zap className="w-5 h-5 text-amber-400 fill-current" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Value Props & Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0b5cb5]" />
                    <span>Free shipping over $100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0b5cb5]" />
                    <span>2 Year Official Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#0b5cb5]" />
                    <span>30-Day Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section id="reviews" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Real feedback from verified purchasers
              </p>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-blue-50 text-[#0b5cb5] hover:bg-blue-100 font-semibold px-4 py-2 rounded-xl text-sm transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{showReviewForm ? 'Cancel' : 'Write a Review'}</span>
            </button>
          </div>

          {/* New Review Form */}
          {showReviewForm && (
            <form
              onSubmit={handleAddReview}
              className="mt-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex flex-col gap-4 animate-in fade-in duration-200"
            >
              <h3 className="text-base font-bold text-gray-900">
                Write Your Review
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0b5cb5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Rating
                  </label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0b5cb5]"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Not Satisfied</option>
                    <option value={1}>1 Star - Poor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share details of your experience with this product..."
                  className="w-full bg-white border border-gray-200 rounded-lg p-3.5 text-sm outline-none focus:ring-2 focus:ring-[#0b5cb5]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0b5cb5] hover:bg-[#094ea6] text-white font-semibold px-6 py-2 rounded-lg text-sm transition cursor-pointer shadow"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}

          {/* Review List */}
          <div className="mt-8 space-y-6">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0b5cb5] text-white font-bold text-xs flex items-center justify-center">
                      {rev.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {rev.userName}
                      </h4>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>
                  </div>
                  <RatingStars rating={rev.rating} size="sm" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pl-12">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#0f2942]">
              You May Also Like
            </h2>
            <Link
              href="/"
              className="text-sm font-semibold text-[#0b5cb5] hover:underline"
            >
              View all products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}
