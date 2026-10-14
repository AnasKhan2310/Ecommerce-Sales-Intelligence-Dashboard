import React, { useState } from 'react';
import { CategoryRecord } from '../../data/retailData';
import { formatCurrency } from '../../utils/formatters';

interface CategoryMixChartProps {
  categories: CategoryRecord[];
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

export const CategoryMixChart: React.FC<CategoryMixChartProps> = ({
  categories,
  onSelectCategory,
  activeCategory
}) => {
  const [hoveredCat, setHoveredCat] = useState<CategoryRecord | null>(null);

  const totalRevenue = categories.reduce((sum, c) => sum + c.revenue, 0) || 1;

  // Sophisticated monochrome/neutral tone palette for anti-slop
  const customPalette = ['#e2e5eb', '#9aa1b2', '#757c91', '#545b70', '#3b4154', '#2a2f3f'];

  const size = 240;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const slices = categories.map((cat, i) => {
    const percent = (cat.revenue / totalRevenue) * 100;
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += percent;
    return {
      ...cat,
      percent,
      color: customPalette[i % customPalette.length],
      strokeDasharray,
      strokeDashoffset
    };
  });

  const activeDisplay = hoveredCat || (activeCategory && activeCategory !== 'All Categories'
    ? slices.find(c => c.category === activeCategory) || null
    : null);

  return (
    <div className="bg-[#13151c] border border-[#242735] rounded-lg p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="pb-4 border-b border-[#242735] mb-5">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9aa1b2] font-mono-numbers">
            Product Taxonomy
          </span>
          <h3 className="font-serif-display text-xl font-normal text-[#f2f4f8] tracking-tight mt-0.5">
            Sales Mix by Derived Category
          </h3>
          <p className="text-xs text-[#9aa1b2] mt-0.5">
            Turnover concentration classified by item descriptions
          </p>
        </div>

        {/* Center Donut + Legend Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-2">
          {/* SVG Donut */}
          <div className="relative w-[180px] h-[180px] shrink-0">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full -rotate-90 transform overflow-visible"
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#1a1c26"
                strokeWidth={strokeWidth}
              />

              {slices.map((slice, i) => {
                const isHovered = hoveredCat?.category === slice.category;
                const isSelected = activeCategory === slice.category;

                return (
                  <circle
                    key={i}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth={isHovered || isSelected ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={slice.strokeDasharray}
                    strokeDashoffset={slice.strokeDashoffset}
                    className="transition-all duration-150 cursor-pointer"
                    onMouseEnter={() => setHoveredCat(slice)}
                    onMouseLeave={() => setHoveredCat(null)}
                    onClick={() => onSelectCategory && onSelectCategory(slice.category)}
                  />
                );
              })}
            </svg>

            {/* Inner Center Metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-2">
              <span className="text-[10px] uppercase font-medium text-[#9aa1b2] tracking-wider truncate max-w-[120px] font-mono-numbers">
                {activeDisplay ? activeDisplay.category : 'Aggregate Volume'}
              </span>
              <span className="text-base font-semibold text-[#f2f4f8] font-mono-numbers leading-tight mt-0.5">
                {activeDisplay
                  ? formatCurrency(activeDisplay.revenue, true)
                  : formatCurrency(totalRevenue, true)}
              </span>
              <span className="text-[10px] text-[#9aa1b2] font-mono-numbers mt-0.5">
                {activeDisplay
                  ? `${((activeDisplay.revenue / totalRevenue) * 100).toFixed(1)}% share`
                  : '100% total'}
              </span>
            </div>
          </div>

          {/* Legend Items (Clean hairline hover) */}
          <div className="space-y-1.5 w-full sm:w-auto flex-1">
            {slices.map((cat, idx) => {
              const isHovered = hoveredCat?.category === cat.category;
              const isSelected = activeCategory === cat.category;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-xs p-1.5 rounded cursor-pointer transition-colors ${
                    isHovered || isSelected ? 'bg-[#1a1c26] text-white' : 'text-[#9aa1b2] hover:bg-[#1a1c26]/60'
                  }`}
                  onMouseEnter={() => setHoveredCat(cat)}
                  onMouseLeave={() => setHoveredCat(null)}
                  onClick={() => onSelectCategory && onSelectCategory(cat.category)}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span
                      className={`truncate ${
                        isHovered || isSelected ? 'text-[#f2f4f8] font-medium' : 'text-[#c6cbd6]'
                      }`}
                    >
                      {cat.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono-numbers">
                    <span className="text-[#676e82] text-[11px]">
                      {cat.percent.toFixed(1)}%
                    </span>
                    <span className="text-[#f2f4f8] text-right min-w-[55px]">
                      {formatCurrency(cat.revenue, true)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#242735] flex items-center justify-between text-xs text-[#9aa1b2]">
        <span>Secondary lines: Bags &amp; Home Decor (£2.08M)</span>
        <span className="font-mono-numbers">6 Categories</span>
      </div>
    </div>
  );
};
