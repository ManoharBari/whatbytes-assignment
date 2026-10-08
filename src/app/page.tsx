'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SidebarFilters from '@/components/SidebarFilters';
import ProductCard from '@/components/ProductCard';
import FeaturedProductCard from '@/components/FeaturedProductCard';
import ToastContainer from '@/components/ToastContainer';
import { products } from '@/data/products';
import { Category, Product } from '@/types';
import { Search, SlidersHorizontal, ArrowUpDown, PackageOpen, Check } from 'lucide-react';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize states from URL parameters
  const initialCategory = (searchParams.get('category') as Category) || 'All';
  const initialPrice = searchParams.get('price') ? Number(searchParams.get('price')) : 1000;
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  const [category, setCategory] = useState<Category>(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(initialPrice);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL searchParams change
  useEffect(() => {
    const urlCat = searchParams.get('category') as Category;
    const urlPrice = searchParams.get('price');
    const urlSearch = searchParams.get('search');
    const urlSort = searchParams.get('sort');

    if (urlCat) setCategory(urlCat);
    if (urlPrice) setMaxPrice(Number(urlPrice));
    if (urlSearch !== null) setSearchQuery(urlSearch);
    if (urlSort) setSortBy(urlSort);
  }, [searchParams]);

  // Update URL params when filters change
  const updateUrlParams = (
    newCat: Category,
    newPrice: number,
    newSearch: string,
    newSort: string
  ) => {
    const params = new URLSearchParams();
    if (newCat !== 'All') params.set('category', newCat);
    if (newPrice < 1000) params.set('price', newPrice.toString());
    if (newSearch.trim()) params.set('search', newSearch.trim());
    if (newSort !== 'featured') params.set('sort', newSort);

    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : '/', { scroll: false });
  };

  const handleCategoryChange = (newCat: Category) => {
    setCategory(newCat);
    updateUrlParams(newCat, maxPrice, searchQuery, sortBy);
  };

  const handleMaxPriceChange = (newPrice: number) => {
    setMaxPrice(newPrice);
    updateUrlParams(category, newPrice, searchQuery, sortBy);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrlParams(category, maxPrice, query, sortBy);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateUrlParams(category, maxPrice, searchQuery, newSort);
  };

  const handleResetFilters = () => {
    setCategory('All');
    setMaxPrice(1000);
    setSearchQuery('');
    setSortBy('featured');
    router.replace('/', { scroll: false });
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (category !== 'All' && item.category !== category) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // Search filter (name, description, brand, category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchBrand = item.brand.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchBrand && !matchCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
      return 0; // 'featured' - original catalog order
    });
  }, [category, maxPrice, searchQuery, sortBy]);

  // Separate regular and featured products (Smartphone)
  const smartphoneFeatured = useMemo(() => {
    return filteredProducts.find((p) => p.id === 'smartphone');
  }, [filteredProducts]);

  const regularProducts = useMemo(() => {
    return filteredProducts.filter((p) => p.id !== 'smartphone');
  }, [filteredProducts]);

  const isFiltered = category !== 'All' || maxPrice < 1000 || searchQuery.trim() !== '';

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc]">
      <Header
        onSearchChange={handleSearchChange}
        searchQueryValue={searchQuery}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle & Search Indicator */}
        <div className="lg:hidden mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 bg-[#0b5cb5] text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isMobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>

          <span className="text-sm font-medium text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </span>
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="lg:hidden mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <SidebarFilters
              selectedCategory={category}
              onSelectCategory={handleCategoryChange}
              maxPrice={maxPrice}
              onMaxPriceChange={handleMaxPriceChange}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Left Sidebar Filters */}
          <div className="hidden lg:block">
            <SidebarFilters
              selectedCategory={category}
              onSelectCategory={handleCategoryChange}
              maxPrice={maxPrice}
              onMaxPriceChange={handleMaxPriceChange}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Right Product Grid Section */}
          <section className="flex-1 w-full">
            {/* Header Bar: Title, Count, Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] tracking-tight">
                  Product Listing
                </h1>
                {isFiltered && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Showing results for {category !== 'All' && <span className="font-semibold text-[#0b5cb5]">Category: {category} </span>}
                    {maxPrice < 1000 && <span className="font-semibold text-[#0b5cb5]">· Price &le; ${maxPrice} </span>}
                    {searchQuery && <span className="font-semibold text-[#0b5cb5]">· Query &quot;{searchQuery}&quot;</span>}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-sm text-sm">
                  <ArrowUpDown className="w-4 h-4 text-gray-500 shrink-0" />
                  <span className="text-xs font-semibold text-gray-500">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-gray-800 outline-none cursor-pointer pr-1"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name-asc">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid / Conditional Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center my-8 shadow-sm">
                <div className="w-16 h-16 bg-blue-50 text-[#0b5cb5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                  We couldn&apos;t find any items matching your selected category, price range, or search keyword. Try adjusting your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#0b5cb5] hover:bg-[#094ea6] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition cursor-pointer shadow"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Regular Products in Grid */}
                {regularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

                {/* Smartphone Featured Card (Matches the bottom highlight card in the screenshot) */}
                {smartphoneFeatured && (
                  <FeaturedProductCard product={smartphoneFeatured} />
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f5f8fc]">
          <div className="w-10 h-10 border-4 border-[#0b5cb5] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
