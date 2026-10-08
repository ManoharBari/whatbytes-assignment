'use client';

import React from 'react';
import { Category } from '@/types';
import { RotateCcw, Filter } from 'lucide-react';

interface SidebarFiltersProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  onResetFilters: () => void;
  totalResultsCount?: number;
}

const CATEGORIES: Category[] = ['All', 'Electronics', 'Clothing', 'Home'];

export default function SidebarFilters({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onMaxPriceChange,
  onResetFilters,
  totalResultsCount,
}: SidebarFiltersProps) {
  const isFiltered = selectedCategory !== 'All' || maxPrice < 1000;

  return (
    <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
      {/* Primary Blue Filter Card (Exact match to screenshot top card) */}
      <div className="bg-[#0b5cb5] text-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold tracking-tight">Filters</h2>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/95 mb-3">Category</h3>
          <div className="space-y-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <label
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className="flex items-center gap-3 cursor-pointer group select-none text-sm text-white/90 hover:text-white"
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-white bg-transparent'
                        : 'border-white/50 group-hover:border-white/80'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className={isSelected ? 'font-medium text-white' : ''}>
                    {cat}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Slider Filter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-white/95">Price</h3>
            <span className="text-xs font-mono font-medium bg-white/20 px-2 py-0.5 rounded text-white">
              Up to ${maxPrice}
            </span>
          </div>

          <div className="relative py-2">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={maxPrice > 1000 ? 1000 : maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full h-1.5 bg-blue-300/40 rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
            />
          </div>

          <div className="flex justify-between text-xs text-white/80 font-mono mt-1">
            <span>0</span>
            <span>1000</span>
          </div>
        </div>
      </div>

      {/* Secondary Light Card (Exact match to screenshot bottom card) */}
      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm text-gray-800">
        <h3 className="text-base font-bold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2.5 mb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <label
                key={`secondary-${cat}`}
                onClick={() => onSelectCategory(cat)}
                className="flex items-center gap-3 cursor-pointer group select-none text-sm text-gray-600 hover:text-gray-900"
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-[#0b5cb5] bg-transparent'
                      : 'border-gray-300 group-hover:border-gray-400'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#0b5cb5]" />
                  )}
                </div>
                <span className={isSelected ? 'font-medium text-[#0b5cb5]' : ''}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>

        {/* Max Price Number Input Stepper */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            Max Price ($)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="5000"
              step="10"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b5cb5] focus:border-transparent text-gray-800"
              placeholder="e.g. 1000"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
