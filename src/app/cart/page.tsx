'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';
import { useCart } from '@/context/CartContext';
import {
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  X,
  CreditCard,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    shipping,
    totalPrice,
    totalItems,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'WHATBYTES' || code === 'SAVE20') {
      const discount = 20;
      setPromoDiscount(discount);
      setAppliedPromo(code);
      setPromoCode('');
    } else if (code === 'SAVE10') {
      const discount = Math.round(subtotal * 0.1 * 100) / 100;
      setPromoDiscount(discount);
      setAppliedPromo(code);
      setPromoCode('');
    } else {
      setPromoError('Invalid coupon code. Try "WHATBYTES" or "SAVE10"');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const finalTotal = Math.max(0, Math.round((totalPrice - promoDiscount) * 100) / 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderNumber(`WB-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title & Back Button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#0b5cb5] transition shadow-sm"
              aria-label="Back to shopping"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg border border-red-200 bg-red-50/50 hover:bg-red-50 transition cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Order Complete Modal / Success Screen */}
        {orderComplete ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-14 text-center max-w-2xl mx-auto my-8 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-base text-gray-600 mb-4">
              Thank you for your purchase. We have received your order and are processing it for swift delivery.
            </p>
            <div className="inline-block bg-blue-50 border border-blue-100 text-[#0b5cb5] font-mono font-bold px-4 py-2 rounded-xl text-sm mb-8">
              Order ID: {orderNumber}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-[#0b5cb5] hover:bg-[#094ea6] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 sm:p-16 text-center max-w-2xl mx-auto shadow-sm my-8">
            <div className="w-20 h-20 bg-blue-50 text-[#0b5cb5] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
              Looks like you haven&apos;t added anything to your cart yet. Explore our latest electronics, clothing, and home collection!
            </p>
            <Link
              href="/"
              className="bg-[#0b5cb5] hover:bg-[#094ea6] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          /* Cart Content: Items List (Left) & Order Summary (Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 transition hover:shadow-md"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Link
                      href={`/product/${product.id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0 flex items-center justify-center overflow-hidden group"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition"
                      />
                    </Link>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0b5cb5] bg-blue-50 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        className="block text-base sm:text-lg font-bold text-gray-900 hover:text-[#0b5cb5] transition mt-1"
                      >
                        {product.title}
                      </Link>
                      <p className="text-sm font-semibold text-gray-500">
                        ${product.price} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls & Price Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-gray-900 select-none">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="text-lg font-extrabold text-gray-900">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b5cb5] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Promo / Coupon Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. WHATBYTES"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-sm uppercase font-mono outline-none focus:ring-2 focus:ring-[#0b5cb5]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-500 font-medium">{promoError}</p>
                )}
                {appliedPromo && (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-medium">
                    <span>Coupon &quot;{appliedPromo}&quot; applied (-${promoDiscount})</span>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-emerald-800 hover:text-emerald-950 ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </form>

              {/* Cost Calculations */}
              <div className="space-y-3 text-sm text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-semibold text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-200 flex justify-between text-base sm:text-lg font-extrabold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#0b5cb5]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#0b5cb5] hover:bg-[#094ea6] active:scale-[0.98] disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </button>

              {/* Security & Guarantee Badges */}
              <div className="pt-4 space-y-2 text-xs text-gray-500 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0b5cb5] shrink-0" />
                  <span>Free standard delivery on orders over $100</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}
