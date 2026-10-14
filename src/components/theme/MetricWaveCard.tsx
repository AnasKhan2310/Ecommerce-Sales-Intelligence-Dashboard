import React from 'react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface MetricWaveCardProps {
  revenue: number;
  orders: number;
  aov: number;
  peakLabel?: string;
}

export const MetricWaveCard: React.FC<MetricWaveCardProps> = ({
  revenue,
  orders,
  aov,
  peakLabel = 'Nov Peak'
}) => {
  return (
    <div className="space-y-4">
      {/* Top Card: Gross Revenue with Purple Wave & Yellow Badge (matching image top-left card) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">
              Gross Revenue
            </h3>
            <p className="text-[11px] text-slate-400">
              Validated commercial turnover
            </p>
          </div>
          {/* Yellow Badge (matching `125` badge from image) */}
          <div className="bg-[#ffbe3b] text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs font-mono-numbers">
            {peakLabel}
          </div>
        </div>

        <div className="my-2">
          <div className="text-2xl font-extrabold text-slate-900 font-mono-numbers tracking-tight">
            {formatCurrency(revenue)}
          </div>
        </div>

        {/* Purple Wave Curve (matching the purple wave in image) */}
        <div className="w-full h-14 mt-1 relative">
          <svg viewBox="0 0 280 60" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5a57f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#5a57f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Soft baseline guide */}
            <line x1="0" y1="40" x2="280" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Wave curve */}
            <path
              d="M 0 35 C 40 10, 70 50, 110 30 C 150 10, 180 58, 220 22 C 240 5, 260 8, 280 12"
              fill="none"
              stroke="#5a57f6"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Peak Node with Ring */}
            <circle cx="220" cy="22" r="4.5" fill="#5a57f6" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Bottom Card: 1205 / 840 split with mini sparklines (matching image) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="grid grid-cols-2 gap-4 divide-x divide-slate-100">
          {/* Left: Orders with Yellow Wave */}
          <div>
            <div className="text-xl font-extrabold text-slate-900 font-mono-numbers tracking-tight">
              {formatNumber(orders)}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Total Invoices
            </div>
            {/* Yellow Sparkline */}
            <div className="h-6 w-full mt-2">
              <svg viewBox="0 0 100 24" className="w-full h-full">
                <path
                  d="M 0 18 Q 25 6, 50 16 T 100 8"
                  fill="none"
                  stroke="#ffbe3b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Right: AOV with Cyan Wave */}
          <div className="pl-4">
            <div className="text-xl font-extrabold text-slate-900 font-mono-numbers tracking-tight">
              {formatCurrency(aov)}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Average Basket
            </div>
            {/* Cyan Sparkline */}
            <div className="h-6 w-full mt-2">
              <svg viewBox="0 0 100 24" className="w-full h-full">
                <path
                  d="M 0 16 Q 30 22, 60 10 T 100 12"
                  fill="none"
                  stroke="#00bac7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
