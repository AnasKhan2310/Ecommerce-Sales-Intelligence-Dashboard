import React, { useState } from 'react';
import { COUNTRY_DATA } from '../../data/retailData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface CountryPerformanceChartProps {
  onSelectCountry?: (country: string) => void;
  activeCountry?: string;
}

export const CountryPerformanceChart: React.FC<CountryPerformanceChartProps> = ({
  onSelectCountry,
  activeCountry
}) => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const top10 = COUNTRY_DATA.slice(0, 10);
  const displayedCountries = showAll ? COUNTRY_DATA : top10;
  const maxRevenue = Math.max(...displayedCountries.map((c) => c.revenue), 1);
  const totalRevenue = COUNTRY_DATA.reduce((s, c) => s + c.revenue, 0);

  return (
    <div className="bg-[#13151c] border border-[#242735] rounded-lg p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-5 pb-4 border-b border-[#242735]">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9aa1b2] font-mono-numbers">
              Geographic Distribution
            </span>
            <h3 className="font-serif-display text-xl font-normal text-[#f2f4f8] tracking-tight mt-0.5">
              Territorial Market Penetration
            </h3>
            <p className="text-xs text-[#9aa1b2] mt-0.5">
              Domestic demand vs. European and intercontinental export volume
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="px-3 py-1 text-xs font-medium rounded bg-[#1a1c26] border border-[#242735] text-[#9aa1b2] hover:text-[#f2f4f8] transition-colors self-start sm:self-auto"
          >
            {showAll ? 'Top 10 Only' : 'All 38 Territories'}
          </button>
        </div>

        {/* Horizontal Bar List */}
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {displayedCountries.map((item, index) => {
            const percentage = (item.revenue / maxRevenue) * 100;
            const shareOfTotal = (item.revenue / totalRevenue) * 100;
            const isHovered = hoveredCountry === item.country;
            const isSelected = activeCountry === item.country;

            return (
              <div
                key={item.country}
                className={`group relative p-1.5 rounded transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#1a1c26]' : isHovered ? 'bg-[#1a1c26]/60' : ''
                }`}
                onMouseEnter={() => setHoveredCountry(item.country)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => onSelectCountry && onSelectCountry(item.country)}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono-numbers text-[#676e82] text-[11px] w-5 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-medium truncate ${
                        isSelected ? 'text-[#f2f4f8] font-semibold' : 'text-[#c6cbd6]'
                      }`}
                    >
                      {item.country}
                    </span>
                    <span className="text-[10px] text-[#676e82] font-mono-numbers">
                      / {shareOfTotal.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#676e82] font-mono-numbers text-[11px] hidden sm:inline">
                      {formatNumber(item.orders)} orders
                    </span>
                    <span className="font-mono-numbers font-medium text-[#f2f4f8] min-w-[70px] text-right">
                      {formatCurrency(item.revenue, true)}
                    </span>
                  </div>
                </div>

                <div className="h-1.5 w-full bg-[#1a1c26] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-200 ${
                      index === 0
                        ? 'bg-[#f2f4f8]'
                        : index < 3
                        ? 'bg-[#c6cbd6]'
                        : 'bg-[#70778c]'
                    }`}
                    style={{ width: `${Math.max(percentage, 1)}%` }}
                  />
                </div>

                {isHovered && (
                  <div className="absolute right-0 bottom-full mb-1 z-30 bg-[#1a1c26] border border-[#363b4e] rounded p-2.5 shadow-md text-[11px] pointer-events-none min-w-[190px]">
                    <div className="font-semibold text-[#f2f4f8] border-b border-[#242735] pb-1 mb-1.5 flex items-center justify-between font-mono-numbers">
                      <span>{item.country}</span>
                      <span className="text-[#9aa1b2] font-mono-numbers">ISO: {item.code}</span>
                    </div>
                    <div className="space-y-0.5 text-[#9aa1b2]">
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-mono-numbers font-medium text-[#f2f4f8]">
                          {formatCurrency(item.revenue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Share:</span>
                        <span className="font-mono-numbers text-[#f2f4f8]">{shareOfTotal.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Invoices:</span>
                        <span className="font-mono-numbers text-[#f2f4f8]">{formatNumber(item.orders)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clients:</span>
                        <span className="font-mono-numbers text-[#f2f4f8]">{item.customers}</span>
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
        <span>UK Domestic: £9.00M (84.6%)</span>
        <span className="font-mono-numbers text-[#f2f4f8]">Export: £1.64M (15.4%)</span>
      </div>
    </div>
  );
};
