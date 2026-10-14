import React, { useState } from 'react';
import { CATEGORY_DATA, CategoryRecord } from '../../data/retailData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface CategoryGroupedBarsProps {
  categories: CategoryRecord[];
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

export const CategoryGroupedBars: React.FC<CategoryGroupedBarsProps> = ({
  categories,
  onSelectCategory,
  activeCategory
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxRev = Math.max(...categories.map((c) => c.revenue), 1);
  const maxUnits = Math.max(...categories.map((c) => c.units), 1);
  const maxOrders = Math.max(...categories.map((c) => c.orders), 1);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">
            Merchandise Category Volume
          </h3>
          <p className="text-[11px] text-slate-400">
            Multi-metric performance across product families
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#5a57f6]" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#00bac7]" />
            <span>Units</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#ffbe3b]" />
            <span>Orders</span>
          </div>
        </div>
      </div>

      {/* Grouped Bars Chart (matching bottom-right multi-bar chart in image) */}
      <div className="h-44 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 pt-4 pb-2 border-b border-slate-100">
        {categories.map((cat, idx) => {
          const revHeight = Math.max((cat.revenue / maxRev) * 100, 8);
          const unitHeight = Math.max((cat.units / maxUnits) * 90, 8);
          const orderHeight = Math.max((cat.orders / maxOrders) * 80, 8);
          const isSelected = activeCategory === cat.category;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={cat.category}
              className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => onSelectCategory && onSelectCategory(cat.category)}
            >
              {/* Grouped 3 Bars */}
              <div className="w-full flex items-end justify-center gap-1 h-36">
                {/* Purple: Revenue */}
                <div
                  className="w-2 sm:w-2.5 bg-[#5a57f6] rounded-t-sm transition-all duration-300 group-hover:opacity-90"
                  style={{ height: `${revHeight}%` }}
                  title={`Revenue: ${formatCurrency(cat.revenue)}`}
                />
                {/* Cyan: Units */}
                <div
                  className="w-2 sm:w-2.5 bg-[#00bac7] rounded-t-sm transition-all duration-300 group-hover:opacity-90"
                  style={{ height: `${unitHeight}%` }}
                  title={`Units: ${formatNumber(cat.units)}`}
                />
                {/* Yellow: Orders */}
                <div
                  className="w-2 sm:w-2.5 bg-[#ffbe3b] rounded-t-sm transition-all duration-300 group-hover:opacity-90"
                  style={{ height: `${orderHeight}%` }}
                  title={`Orders: ${formatNumber(cat.orders)}`}
                />
              </div>

              {/* X-axis label */}
              <span
                className={`text-[9px] font-medium text-center truncate max-w-[50px] transition-colors ${
                  isSelected || isHovered ? 'text-[#00bac7] font-bold' : 'text-slate-500'
                }`}
                title={cat.category}
              >
                {cat.category.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Details Preview */}
      <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Leading Category: {categories[0]?.category}</span>
        <span className="font-mono-numbers font-bold text-slate-700">
          {formatCurrency(categories[0]?.revenue ?? 0, true)}
        </span>
      </div>
    </div>
  );
};
