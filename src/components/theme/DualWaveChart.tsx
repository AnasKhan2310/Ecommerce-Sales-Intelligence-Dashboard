import React, { useState } from 'react';
import { MonthlyRecord } from '../../data/retailData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface DualWaveChartProps {
  data: MonthlyRecord[];
  activeMonth?: string;
  onSelectMonth?: (month: string) => void;
}

export const DualWaveChart: React.FC<DualWaveChartProps> = ({
  data,
  activeMonth,
  onSelectMonth
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 640;
  const height = 240;
  const padding = { top: 30, right: 25, bottom: 35, left: 35 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxRev = Math.max(...data.map((d) => d.revenue), 1);
  const maxOrd = Math.max(...data.map((d) => d.orders), 1);

  // Purple Points (Revenue)
  const purplePoints = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - (d.revenue / maxRev) * chartH * 0.85;
    return { x, y, record: d };
  });

  // Yellow Points (Orders Volume scaled)
  const yellowPoints = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - (d.orders / maxOrd) * chartH * 0.65;
    return { x, y, record: d };
  });

  // Generate smooth cubic bezier SVG path
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    return pts.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      const prev = a[i - 1];
      const cx1 = prev.x + (point.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (point.x - prev.x) / 2;
      const cy2 = point.y;
      return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${point.x} ${point.y}`;
    }, '');
  };

  const purpleLine = createSmoothPath(purplePoints);
  const yellowLine = createSmoothPath(yellowPoints);

  const purpleArea = purplePoints.length > 0
    ? `${purpleLine} L ${purplePoints[purplePoints.length - 1].x} ${padding.top + chartH} L ${purplePoints[0].x} ${padding.top + chartH} Z`
    : '';

  const yellowArea = yellowPoints.length > 0
    ? `${yellowLine} L ${yellowPoints[yellowPoints.length - 1].x} ${padding.top + chartH} L ${yellowPoints[0].x} ${padding.top + chartH} Z`
    : '';

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">
            Monthly Revenue &amp; Order Trajectory
          </h3>
          <p className="text-[11px] text-slate-400">
            Dual continuous curves comparing revenue velocity (£) vs order frequency
          </p>
        </div>

        {/* Pill Badge Filter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
          <span>All 13 Months</span>
        </div>
      </div>

      {/* SVG Canvas (exact styling of the dual wave in image) */}
      <div className="relative w-full aspect-[8/3] max-h-[260px] my-1">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible select-none">
          <defs>
            <linearGradient id="purpleWaveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5a57f6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#5a57f6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="yellowWaveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffbe3b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffbe3b" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Faint Horizontal Guideline */}
          <line x1={padding.left} y1={padding.top + chartH * 0.5} x2={width - padding.right} y2={padding.top + chartH * 0.5} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={padding.left} y1={padding.top + chartH} x2={width - padding.right} y2={padding.top + chartH} stroke="#e2e8f0" strokeWidth="1" />

          {/* Areas */}
          <path d={yellowArea} fill="url(#yellowWaveGradient)" />
          <path d={purpleArea} fill="url(#purpleWaveGradient)" />

          {/* Yellow Wave Curve */}
          <path
            d={yellowLine}
            fill="none"
            stroke="#ffbe3b"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Purple Wave Curve */}
          <path
            d={purpleLine}
            fill="none"
            stroke="#5a57f6"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Points & Interactive Nodes */}
          {purplePoints.map((p, idx) => {
            const yP = yellowPoints[idx];
            const isHovered = hoveredIdx === idx;
            const isSelected = activeMonth === p.record.month;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onSelectMonth && onSelectMonth(p.record.month)}
              >
                {/* Yellow Node */}
                <circle
                  cx={yP.x}
                  cy={yP.y}
                  r={isHovered ? 5.5 : 4}
                  fill="#ffffff"
                  stroke="#ffbe3b"
                  strokeWidth="2.5"
                  className="transition-transform duration-100"
                />

                {/* Purple Node */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered || isSelected ? 6 : 4}
                  fill="#ffffff"
                  stroke="#5a57f6"
                  strokeWidth="2.5"
                  className="transition-transform duration-100"
                />

                {/* X-axis label */}
                <text
                  x={p.x}
                  y={height - 10}
                  textAnchor="middle"
                  className={`text-[9px] font-mono-numbers ${
                    isHovered || isSelected ? 'fill-[#5a57f6] font-bold' : 'fill-slate-400'
                  }`}
                >
                  {p.record.month.slice(5)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredIdx !== null && purplePoints[hoveredIdx] && (
          <div
            className="absolute z-20 pointer-events-none bg-white border border-slate-200 rounded-xl p-3 shadow-lg text-xs min-w-[170px] -translate-x-1/2 -translate-y-[120%]"
            style={{
              left: `${(purplePoints[hoveredIdx].x / width) * 100}%`,
              top: `${(purplePoints[hoveredIdx].y / height) * 100}%`
            }}
          >
            <div className="font-bold text-slate-800 border-b border-slate-100 pb-1 mb-1 font-mono-numbers">
              {purplePoints[hoveredIdx].record.label}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#5a57f6]" />
                  Revenue:
                </span>
                <span className="font-bold font-mono-numbers text-slate-900">
                  {formatCurrency(purplePoints[hoveredIdx].record.revenue)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-[#ffbe3b]" />
                  Orders:
                </span>
                <span className="font-bold font-mono-numbers text-slate-900">
                  {formatNumber(purplePoints[hoveredIdx].record.orders)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend Matching Image (Purple line "Revenue" · Yellow line "Orders") */}
      <div className="flex items-center justify-center gap-6 mt-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-[#5a57f6] rounded-full inline-block" />
          <span className="font-medium text-slate-600 text-[11px]">Gross Revenue (£)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-0.5 bg-[#ffbe3b] rounded-full inline-block" />
          <span className="font-medium text-slate-600 text-[11px]">Order Volume</span>
        </div>
      </div>
    </div>
  );
};
