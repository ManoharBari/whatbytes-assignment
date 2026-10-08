'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  searchQueryValue?: string;
}

function SearchForm({ onSearchChange, searchQueryValue }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchQueryValue || searchParams.get('search') || '');

  useEffect(() => {
    if (searchQueryValue !== undefined) {
      setSearch(searchQueryValue);
    }
  }, [searchQueryValue]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      if (onSearchChange) {
        onSearchChange(search);
      }
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set('search', search.trim());
      } else {
        params.delete('search');
      }
      router.replace(`/?${params.toString()}`);
    } else {
      router.push(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    if (pathname === '/' && onSearchChange) {
      onSearchChange(val);
    }
  };

  const clearSearch = () => {
    setSearch('');
    if (pathname === '/' && onSearchChange) {
      onSearchChange('');
    }
    if (pathname === '/') {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('search');
      router.replace(`/?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex-1 max-w-xl mx-2 sm:mx-6"
    >
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-white/70 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="Search for products..."
          className="w-full bg-[#1b6cc7] border border-blue-400/40 text-white placeholder-white/70 text-sm rounded-lg pl-11 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-white/40 focus:border-white transition-all shadow-inner"
        />
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 text-white/70 hover:text-white p-0.5 rounded-full transition cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}

export default function Header({ onSearchChange, searchQueryValue }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#0b5cb5] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white hover:opacity-90 transition flex items-center shrink-0"
        >
          Logo
        </Link>

        {/* Search Bar wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="flex-1 max-w-xl mx-2 sm:mx-6">
              <div className="w-full bg-[#1b6cc7] border border-blue-400/40 h-10 rounded-lg animate-pulse" />
            </div>
          }
        >
          <SearchForm
            onSearchChange={onSearchChange}
            searchQueryValue={searchQueryValue}
          />
        </Suspense>

        {/* Right Section: Cart & Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/cart"
            id="header-cart-btn"
            className="flex items-center gap-2 bg-[#073c77] hover:bg-[#052e5d] text-white px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition active:scale-95 shadow-sm relative group"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="ml-1 bg-amber-400 text-gray-900 text-xs font-black px-2 py-0.5 rounded-full animate-bounce shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Profile Avatar / Indicator */}
          <div
            className="w-10 h-10 rounded-full bg-white/20 border border-white/30 hidden sm:flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition"
            title="User Account"
          >
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
