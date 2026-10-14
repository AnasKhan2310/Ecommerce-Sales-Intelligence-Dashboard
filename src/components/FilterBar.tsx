import React from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { COUNTRY_DATA, MONTHLY_DATA, CATEGORY_DATA } from '../data/retailData';

export interface FilterState {
  country: string;
  month: string;
  category: string;
  searchQuery: string;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset
}) => {
  const isFiltered =
    filters.country !== 'All Countries' ||
    filters.month !== 'All Months' ||
    filters.category !== 'All Categories' ||
    filters.searchQuery.trim() !== '';

  const applyPreset = (preset: 'all' | 'uk' | 'intl' | 'q4' | 'home') => {
    if (preset === 'all') {
      onReset();
    } else if (preset === 'uk') {
      onChange({ ...filters, country: 'United Kingdom' });
    } else if (preset === 'intl') {
      onChange({ ...filters, country: 'Netherlands' });
    } else if (preset === 'q4') {
      onChange({ ...filters, month: '2011-11' });
    } else if (preset === 'home') {
      onChange({ ...filters, category: 'Home Decor' });
    }
  };

  return (
    <div className="bg-[#13151c] border border-[#242735] rounded-lg p-4 sm:p-5 mb-8">
      {/* Top Header Row with Segment Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#242735]">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#f2f4f8] font-mono-numbers">
            Filter &amp; Segment Controls
          </h2>
          <p className="text-xs text-[#9aa1b2] mt-0.5">
            Query across 524k transactions by geographical territory, monthly cohort, and product family
          </p>
        </div>

        {/* Presets Bar (Clean segmented buttons, no candy colors) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-[#676e82] mr-1 font-mono-numbers">
            Presets:
          </span>
          <button
            onClick={() => applyPreset('all')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              !isFiltered
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'bg-[#1a1c26] text-[#9aa1b2] hover:text-[#f2f4f8] border border-[#242735]'
            }`}
          >
            All 524k Records
          </button>
          <button
            onClick={() => applyPreset('uk')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              filters.country === 'United Kingdom'
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'bg-[#1a1c26] text-[#9aa1b2] hover:text-[#f2f4f8] border border-[#242735]'
            }`}
          >
            UK Domestic (84.6%)
          </button>
          <button
            onClick={() => applyPreset('intl')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              filters.country === 'Netherlands'
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'bg-[#1a1c26] text-[#9aa1b2] hover:text-[#f2f4f8] border border-[#242735]'
            }`}
          >
            Netherlands Export
          </button>
          <button
            onClick={() => applyPreset('q4')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              filters.month === '2011-11'
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'bg-[#1a1c26] text-[#9aa1b2] hover:text-[#f2f4f8] border border-[#242735]'
            }`}
          >
            Peak Nov 2011
          </button>
          <button
            onClick={() => applyPreset('home')}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              filters.category === 'Home Decor'
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'bg-[#1a1c26] text-[#9aa1b2] hover:text-[#f2f4f8] border border-[#242735]'
            }`}
          >
            Home Decor
          </button>
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {/* Country */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] mb-1.5 font-mono-numbers">
            Country Territory
          </label>
          <select
            value={filters.country}
            onChange={(e) => onChange({ ...filters, country: e.target.value })}
            className="w-full bg-[#1a1c26] border border-[#242735] rounded px-3 py-2 text-xs text-[#f2f4f8] focus:outline-none focus:border-[#42475f] cursor-pointer"
          >
            <option value="All Countries">All Countries (38)</option>
            {COUNTRY_DATA.map((c) => (
              <option key={c.country} value={c.country}>
                {c.country} ({c.orders.toLocaleString()} orders)
              </option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] mb-1.5 font-mono-numbers">
            Monthly Cohort
          </label>
          <select
            value={filters.month}
            onChange={(e) => onChange({ ...filters, month: e.target.value })}
            className="w-full bg-[#1a1c26] border border-[#242735] rounded px-3 py-2 text-xs text-[#f2f4f8] font-mono-numbers focus:outline-none focus:border-[#42475f] cursor-pointer"
          >
            <option value="All Months">All Months (2010-12 – 2011-12)</option>
            {MONTHLY_DATA.map((m) => (
              <option key={m.month} value={m.month}>
                {m.label} ({m.month})
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] mb-1.5 font-mono-numbers">
            Product Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full bg-[#1a1c26] border border-[#242735] rounded px-3 py-2 text-xs text-[#f2f4f8] focus:outline-none focus:border-[#42475f] cursor-pointer"
          >
            <option value="All Categories">All Categories (6)</option>
            {CATEGORY_DATA.map((cat) => (
              <option key={cat.category} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] mb-1.5 font-mono-numbers">
            Catalog Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search SKU or customer ID..."
              value={filters.searchQuery}
              onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
              className="w-full bg-[#1a1c26] border border-[#242735] rounded pl-8 pr-3 py-2 text-xs text-[#f2f4f8] placeholder-[#676e82] focus:outline-none focus:border-[#42475f]"
            />
            <Search className="w-3.5 h-3.5 text-[#676e82] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter State Summary (Clean Unboxed Text with typographic separators) */}
      {isFiltered && (
        <div className="mt-4 pt-3 border-t border-[#242735] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9aa1b2]">
          <div className="flex items-center gap-2">
            <span className="text-[#f2f4f8] font-medium">Applied:</span>
            <span>
              {filters.country !== 'All Countries' && `Country: ${filters.country}`}
              {filters.country !== 'All Countries' && filters.month !== 'All Months' && ' · '}
              {filters.month !== 'All Months' && `Month: ${filters.month}`}
              {(filters.country !== 'All Countries' || filters.month !== 'All Months') &&
                filters.category !== 'All Categories' &&
                ' · '}
              {filters.category !== 'All Categories' && `Category: ${filters.category}`}
              {filters.searchQuery && ` · Search: "${filters.searchQuery}"`}
            </span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-[#9aa1b2] hover:text-[#f2f4f8] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to default</span>
          </button>
        </div>
      )}
    </div>
  );
};
