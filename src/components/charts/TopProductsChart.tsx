import React, { useState } from 'react';
import { ProductRecord, BEST_SELLING_BY_QUANTITY } from '../../data/retailData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface TopProductsChartProps {
  products: ProductRecord[];
}

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ products }) => {
  const [viewBy, setViewBy] = useState<'revenue' | 'quantity'>('revenue');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayedItems = viewBy === 'revenue'
    ? products.slice(0, 10)
    : BEST_SELLING_BY_QUANTITY.slice(0, 10).map((b, i) => ({
        stockCode: `SKU-${i + 1}`,
        description: b.description,
        category: b.category,
        revenue: b.revenue,
        unitsSold: b.units,
        totalOrders: Math.round(b.units / 18),
        unitPriceAvg: b.revenue / b.units
      }));

  const maxVal = viewBy === 'revenue'
    ? Math.max(...displayedItems.map((p) => p.revenue), 1)
    : Math.max(...displayedItems.map((p) => p.unitsSold), 1);

  return (
    <div className="bg-[#13151c] border border-[#242735] rounded-lg p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-5 pb-4 border-b border-[#242735]">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9aa1b2] font-mono-numbers">
              Merchandise Performance
            </span>
            <h3 className="font-serif-display text-xl font-normal text-[#f2f4f8] tracking-tight mt-0.5">
              Top 10 Catalog Performers
            </h3>
            <p className="text-xs text-[#9aa1b2] mt-0.5">
              Ranked merchandise turnover across commercial order lines
            </p>
          </div>

          <div className="flex items-center bg-[#1a1c26] p-1 rounded border border-[#242735] self-start sm:self-auto">
            <button
              onClick={() => setViewBy('revenue')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewBy === 'revenue'
                  ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                  : 'text-[#9aa1b2] hover:text-[#f2f4f8]'
              }`}
            >
              Revenue (£)
            </button>
            <button
              onClick={() => setViewBy('quantity')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                viewBy === 'quantity'
                  ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                  : 'text-[#9aa1b2] hover:text-[#f2f4f8]'
              }`}
            >
              Quantity Sold
            </button>
          </div>
        </div>

        {/* Horizontal Bar List (Solid monochrome bars, zero neon) */}
        <div className="space-y-3.5">
          {displayedItems.map((item, index) => {
            const currentVal = viewBy === 'revenue' ? item.revenue : item.unitsSold;
            const percentage = Math.min((currentVal / maxVal) * 100, 100);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="text-[11px] font-mono-numbers text-[#676e82] w-5 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-medium truncate transition-colors ${
                        isHovered ? 'text-white' : 'text-[#f2f4f8]'
                      }`}
                      title={item.description}
                    >
                      {item.description}
                    </span>
                    <span className="text-[10px] text-[#676e82] shrink-0 hidden md:inline font-mono-numbers">
                      / {item.category}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono-numbers font-medium text-[#f2f4f8]">
                      {viewBy === 'revenue'
                        ? formatCurrency(item.revenue)
                        : `${formatNumber(item.unitsSold)} units`}
                    </span>
                  </div>
                </div>

                {/* Solid Bar Track (No neon gradient) */}
                <div className="h-1.5 w-full bg-[#1a1c26] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-200 ${
                      index === 0
                        ? 'bg-[#f2f4f8]'
                        : index < 3
                        ? 'bg-[#c6cbd6]'
                        : 'bg-[#70778c]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Solid Hover Tooltip */}
                {isHovered && (
                  <div className="absolute right-0 bottom-full mb-1 z-30 bg-[#1a1c26] border border-[#363b4e] rounded p-2.5 shadow-md text-[11px] pointer-events-none min-w-[210px]">
                    <div className="font-semibold text-[#f2f4f8] border-b border-[#242735] pb-1 mb-1.5 truncate">
                      {item.description}
                    </div>
                    <div className="space-y-0.5 text-[#9aa1b2]">
                      <div className="flex justify-between">
                        <span>Gross Revenue:</span>
                        <span className="font-mono-numbers font-medium text-[#f2f4f8]">
                          {formatCurrency(item.revenue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Units Sold:</span>
                        <span className="font-mono-numbers text-[#f2f4f8]">
                          {formatNumber(item.unitsSold)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Invoice Count:</span>
                        <span className="font-mono-numbers text-[#f2f4f8]">
                          {formatNumber(item.totalOrders)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unit Price Avg:</span>
                        <span className="font-mono-numbers text-[#f2f4f8]">
                          {formatCurrency(item.unitPriceAvg)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#242735] flex items-center justify-between text-xs text-[#9aa1b2]">
        <span>Leading SKU: {displayedItems[0]?.description}</span>
        <span className="font-mono-numbers text-[#f2f4f8]">
          {formatCurrency(displayedItems[0]?.revenue ?? 0, true)}
        </span>
      </div>
    </div>
  );
};
