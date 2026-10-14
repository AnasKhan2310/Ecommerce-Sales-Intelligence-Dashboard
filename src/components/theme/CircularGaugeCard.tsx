import React from 'react';
import { formatNumber, formatCurrency } from '../../utils/formatters';

interface CircularGaugeCardProps {
  repeatRate: number;
  uniqueCustomers: number;
  averageOrderValue: number;
  onExploreCustomers?: () => void;
}

export const CircularGaugeCard: React.FC<CircularGaugeCardProps> = ({
  repeatRate,
  uniqueCustomers,
  averageOrderValue,
  onExploreCustomers
}) => {
  // 65.6% or repeatRate
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (repeatRate / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* Card 1: Dual Circular Rings (25K and 90K matching image top-right) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">
            Account Volume &amp; AOV
          </h3>
          <span className="text-[10px] text-slate-400 font-mono-numbers">Targets</span>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2">
          {/* Ring 1 (matching 25K ring in image) */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#00bac7"
                  strokeWidth="8"
                  strokeDasharray="251.3"
                  strokeDashoffset={251.3 * 0.25}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-sm text-slate-800 font-mono-numbers">
                {formatNumber(uniqueCustomers, true)}
              </div>
            </div>
            <span className="text-xs font-bold text-slate-800">Commercial</span>
            <span className="text-[10px] text-slate-400">Total Accounts</span>
          </div>

          {/* Ring 2 (matching 90K ring in image) */}
          <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#5a57f6"
                  strokeWidth="8"
                  strokeDasharray="251.3"
                  strokeDashoffset={251.3 * 0.18}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-slate-800 font-mono-numbers">
                {formatCurrency(averageOrderValue, true)}
              </div>
            </div>
            <span className="text-xs font-bold text-slate-800">Average Basket</span>
            <span className="text-[10px] text-slate-400">Per Order Line</span>
          </div>
        </div>
      </div>

      {/* Card 2: 75% Gauge with Amber Button (matching center card in image) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        <div className="w-full text-left mb-2">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">
            Customer Retention
          </h3>
          <p className="text-[11px] text-slate-400">
            Multi-order repeat wholesale accounts
          </p>
        </div>

        {/* 75% Style Circular Gauge */}
        <div className="relative w-28 h-28 my-2">
          <svg viewBox="0 0 110 110" className="w-full h-full -rotate-90">
            <circle cx="55" cy="55" r="45" fill="none" stroke="#e6f7f8" strokeWidth="11" />
            <circle
              cx="55"
              cy="55"
              r="45"
              fill="none"
              stroke="#00bac7"
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-slate-800 font-mono-numbers">
              {repeatRate.toFixed(0)}%
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-4 px-2">
          2,845 repeat buyers generating &gt; 88% of lifetime retail volume
        </p>

        {/* Amber Action Button (matching `Suscipit` button in image) */}
        <button
          onClick={onExploreCustomers}
          className="w-full py-2 px-4 rounded-xl bg-[#ffbe3b] hover:bg-[#f59e0b] text-slate-900 font-bold text-xs shadow-sm transition-colors cursor-pointer"
        >
          Explore Client Cohorts
        </button>
      </div>
    </div>
  );
};
