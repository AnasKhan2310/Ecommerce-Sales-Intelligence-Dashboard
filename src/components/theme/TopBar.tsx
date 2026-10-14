import React from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCcw, Filter } from 'lucide-react';
import { MONTHLY_DATA, COUNTRY_DATA, CATEGORY_DATA } from '../../data/retailData';
import { FilterState } from '../FilterBar';

interface TopBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  filters,
  onChange,
  onReset
}) => {
  const currentMonthIdx = MONTHLY_DATA.findIndex((m) => m.month === filters.month);

  const handlePrevMonth = () => {
    if (filters.month === 'All Months') {
      onChange({ ...filters, month: MONTHLY_DATA[0].month });
    } else if (currentMonthIdx > 0) {
      onChange({ ...filters, month: MONTHLY_DATA[currentMonthIdx - 1].month });
    }
  };

  const handleNextMonth = () => {
    if (filters.month === 'All Months') {
      onChange({ ...filters, month: MONTHLY_DATA[MONTHLY_DATA.length - 1].month });
    } else if (currentMonthIdx < MONTHLY_DATA.length - 1 && currentMonthIdx >= 0) {
      onChange({ ...filters, month: MONTHLY_DATA[currentMonthIdx + 1].month });
    }
  };

  const currentMonthLabel = currentMonthIdx >= 0
    ? MONTHLY_DATA[currentMonthIdx].label
    : 'All 13 Months';

  return (
    <div className="mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Left Title & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
            Ecommerce Sales Intelligence
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#00bac7]/15 text-[#00929d] font-mono-numbers">
            524k Rows
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Executive Portfolio Dashboard · UCI UK Online Retail Dataset
        </p>
      </div>

      {/* Center & Right Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Month Navigator (matching `< January >` widget style from image) */}
        <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm border border-slate-200/80">
          <button
            onClick={handlePrevMonth}
            disabled={currentMonthIdx === 0}
            className="text-slate-400 hover:text-[#00bac7] disabled:opacity-30 disabled:pointer-events-none p-0.5"
            title="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="px-3 text-xs font-semibold text-slate-700 font-mono-numbers min-w-[100px] text-center">
            {currentMonthLabel}
          </span>

          <button
            onClick={handleNextMonth}
            disabled={currentMonthIdx === MONTHLY_DATA.length - 1}
            className="text-slate-400 hover:text-[#00bac7] disabled:opacity-30 disabled:pointer-events-none p-0.5"
            title="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Territory Filter */}
        <select
          value={filters.country}
          onChange={(e) => onChange({ ...filters, country: e.target.value })}
          className="bg-white border border-slate-200/80 rounded-full px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:outline-none focus:border-[#00bac7] cursor-pointer"
        >
          <option value="All Countries">All Countries (38)</option>
          {COUNTRY_DATA.map((c) => (
            <option key={c.country} value={c.country}>
              {c.country}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="bg-white border border-slate-200/80 rounded-full px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:outline-none focus:border-[#00bac7] cursor-pointer"
        >
          <option value="All Categories">All Categories</option>
          {CATEGORY_DATA.map((c) => (
            <option key={c.category} value={c.category}>
              {c.category}
            </option>
          ))}
        </select>

        {/* Search Pill with Cyan Search Button (exact match to screenshot's Search... [Q]) */}
        <div className="relative flex items-center bg-white rounded-full pl-4 pr-1.5 py-1 shadow-sm border border-slate-200/80 w-[180px] sm:w-[220px]">
          <input
            type="text"
            placeholder="Search..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full text-xs text-slate-700 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          <button
            className="w-7 h-7 rounded-full bg-[#00bac7] hover:bg-[#00a8b5] text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
            title="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reset Filter Button */}
        {(filters.country !== 'All Countries' || filters.month !== 'All Months' || filters.category !== 'All Categories' || filters.searchQuery) && (
          <button
            onClick={onReset}
            className="p-1.5 rounded-full bg-white text-slate-500 hover:text-[#00bac7] border border-slate-200 shadow-sm transition-colors"
            title="Reset All Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
