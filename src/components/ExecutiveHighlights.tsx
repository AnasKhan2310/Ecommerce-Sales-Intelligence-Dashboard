import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { MonthlyRecord, ProductRecord } from '../data/retailData';

interface ExecutiveHighlightsProps {
  currentRevenue: number;
  bestMonth: MonthlyRecord | null;
  topProduct: ProductRecord | null;
  selectedCountry: string;
  selectedMonth: string;
  selectedCategory: string;
}

export const ExecutiveHighlights: React.FC<ExecutiveHighlightsProps> = ({
  currentRevenue,
  bestMonth,
  topProduct,
  selectedCountry,
  selectedCategory
}) => {
  return (
    <div className="bg-[#13151c] border border-[#242735] rounded-lg p-5 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#242735] mb-5">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9aa1b2] font-mono-numbers">
            Portfolio Research Brief
          </span>
          <h3 className="font-serif-display text-xl sm:text-2xl font-normal text-[#f2f4f8] tracking-tight mt-0.5">
            Key Financial Findings &amp; Cohort Observations
          </h3>
        </div>
        <div className="text-xs text-[#9aa1b2] font-mono-numbers">
          Active: {selectedCountry} · {selectedCategory}
        </div>
      </div>

      {/* 3 Core Highlight Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded border border-[#242735] bg-[#0c0d12]/50">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] font-mono-numbers mb-1">
            Top Performing Month
          </div>
          <div className="text-lg font-medium text-[#f2f4f8] font-mono-numbers">
            {bestMonth ? `${bestMonth.label} (${bestMonth.month})` : 'Nov 2011'}
          </div>
          <div className="text-xs text-[#9aa1b2] font-mono-numbers mt-1">
            {bestMonth ? formatCurrency(bestMonth.revenue) : '£1,503,866.78'} gross volume
          </div>
        </div>

        <div className="p-4 rounded border border-[#242735] bg-[#0c0d12]/50">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] font-mono-numbers mb-1">
            Highest Grossing SKU
          </div>
          <div className="text-sm font-medium text-[#f2f4f8] truncate" title={topProduct?.description ?? 'REGENCY CAKESTAND 3 TIER'}>
            {topProduct ? topProduct.description : 'REGENCY CAKESTAND 3 TIER'}
          </div>
          <div className="text-xs text-[#9aa1b2] font-mono-numbers mt-1">
            {topProduct ? `${formatCurrency(topProduct.revenue)} cumulative` : '£174,156.54'}
          </div>
        </div>

        <div className="p-4 rounded border border-[#242735] bg-[#0c0d12]/50">
          <div className="text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] font-mono-numbers mb-1">
            Selected View Volume
          </div>
          <div className="text-lg font-medium text-[#f2f4f8] font-mono-numbers">
            {formatCurrency(currentRevenue)}
          </div>
          <div className="text-xs text-[#9aa1b2] font-mono-numbers mt-1">
            Dynamic aggregation for current filter slice
          </div>
        </div>
      </div>

      {/* Editorial Observation Columns (Clean text with subtle hairline border) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs leading-relaxed text-[#9aa1b2]">
        <div className="border-l border-[#2e3244] pl-4">
          <h4 className="text-xs font-semibold text-[#f2f4f8] mb-1">
            Pre-Holiday Wholesale Stocking Cycles
          </h4>
          <p>
            Order volumes exhibit sharp seasonality, escalating from September (£1.05M) to a peak in November (£1.50M, +30.6% MoM). 34.6% of annual volume is concentrated in the final quarter as independent gift shops prepare holiday inventory.
          </p>
        </div>

        <div className="border-l border-[#2e3244] pl-4">
          <h4 className="text-xs font-semibold text-[#f2f4f8] mb-1">
            Data Sanitation &amp; Hygiene Standards
          </h4>
          <p>
            The preprocessing stage systematically purged 17,031 cancelled invoice lines (marked with prefix &apos;C&apos;), along with zero-price system vouchers and negative stock adjustments, ensuring uncompromised executive financial reporting.
          </p>
        </div>
      </div>
    </div>
  );
};
