import React, { useState } from 'react';
import { MonthlyRecord } from '../../data/retailData';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters';

interface MonthlyRevenueChartProps {
  data: MonthlyRecord[];
  activeMonth?: string;
  onSelectMonth?: (month: string) => void;
}

export const MonthlyRevenueChart: React.FC<MonthlyRevenueChartProps> = ({
  data,
  activeMonth,
  onSelectMonth
}) => {
  const [metricMode, setMetricMode] = useState<'revenue' | 'units' | 'growth'>('revenue');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-[#13151c] border border-[#242735] rounded-lg p-6 text-center text-[#9aa1b2]">
        No monthly trend data available for current selection.
      </div>
    );
  }

  const values = data.map((d) => {
    if (metricMode === 'revenue') return d.revenue;
    if (metricMode === 'units') return d.units;
    return d.growthPercent ?? 0;
  });

  const maxValue = Math.max(...values, 1);
  const minValue = metricMode === 'growth' ? Math.min(...values, 0) : 0;
  const valueRange = maxValue - minValue || 1;

  const width = 800;
  const height = 300;
  const padding = { top: 30, right: 30, bottom: 45, left: 70 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = data.map((d, i) => {
    const val = metricMode === 'revenue' ? d.revenue : metricMode === 'units' ? d.units : (d.growthPercent ?? 0);
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - ((val - minValue) / valueRange) * chartH;
    return { x, y, record: d, val };
  });

  const linePath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const baselineY = padding.top + chartH - ((0 - minValue) / valueRange) * chartH;
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
    : '';

  const peakItem = [...data].sort((a, b) => b.revenue - a.revenue)[0];

  return (
    <div className="bg-[#13151c] border border-[#242735] rounded-lg p-5 sm:p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6 pb-4 border-b border-[#242735]">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9aa1b2] font-mono-numbers">
            Chronological Sales Velocity
          </span>
          <h3 className="font-serif-display text-xl font-normal text-[#f2f4f8] tracking-tight mt-0.5">
            13-Month Revenue &amp; Shipment Trajectory
          </h3>
          <p className="text-xs text-[#9aa1b2] mt-0.5">
            Empirical monthly progression illustrating pre-holiday stocking surge in Q4 2011
          </p>
        </div>

        {/* View Switcher (Solid restrained buttons) */}
        <div className="flex items-center bg-[#1a1c26] p-1 rounded border border-[#242735] self-start sm:self-auto">
          <button
            onClick={() => setMetricMode('revenue')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              metricMode === 'revenue'
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'text-[#9aa1b2] hover:text-[#f2f4f8]'
            }`}
          >
            Revenue (£)
          </button>
          <button
            onClick={() => setMetricMode('units')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              metricMode === 'units'
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'text-[#9aa1b2] hover:text-[#f2f4f8]'
            }`}
          >
            Units Shipped
          </button>
          <button
            onClick={() => setMetricMode('growth')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              metricMode === 'growth'
                ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                : 'text-[#9aa1b2] hover:text-[#f2f4f8]'
            }`}
          >
            MoM Growth (%)
          </button>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full aspect-[8/3] max-h-[340px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible select-none"
        >
          <defs>
            <linearGradient id="solidAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f2f4f8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#f2f4f8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Hairline Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const val = minValue + (1 - pct) * valueRange;
            const y = padding.top + pct * chartH;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#242735"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-[#676e82] text-[10px] font-mono-numbers"
                >
                  {metricMode === 'revenue'
                    ? formatCurrency(val, true)
                    : metricMode === 'units'
                    ? formatNumber(val, true)
                    : `${val.toFixed(0)}%`}
                </text>
              </g>
            );
          })}

          {/* Baseline if Growth mode */}
          {metricMode === 'growth' && (
            <line
              x1={padding.left}
              y1={baselineY}
              x2={width - padding.right}
              y2={baselineY}
              stroke="#4a5065"
              strokeWidth="1"
            />
          )}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#solidAreaGradient)" />

          {/* High-Contrast Solid Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#f2f4f8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p, idx) => {
            const isHovered = hoveredIdx === idx;
            const isSelected = activeMonth === p.record.month;
            const isPeak = p.record.month === peakItem?.month;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => onSelectMonth && onSelectMonth(p.record.month)}
              >
                {/* Vertical hairline scrub line */}
                {isHovered && (
                  <line
                    x1={p.x}
                    y1={padding.top}
                    x2={p.x}
                    y2={padding.top + chartH}
                    stroke="#8e95a5"
                    strokeWidth="1"
                  />
                )}

                {/* Main Circle Node (Solid, high contrast, zero glowing blur) */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5 : isPeak || isSelected ? 4.5 : 3.5}
                  fill={isPeak ? '#f2f4f8' : isSelected ? '#ffffff' : '#13151c'}
                  stroke="#f2f4f8"
                  strokeWidth="2"
                  className="transition-all duration-100"
                />

                {/* X-axis Label */}
                <text
                  x={p.x}
                  y={height - 10}
                  textAnchor="middle"
                  className={`text-[10px] font-mono-numbers transition-colors ${
                    isHovered || isSelected ? 'fill-[#f2f4f8] font-bold' : 'fill-[#676e82]'
                  }`}
                >
                  {p.record.month.slice(2)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip (Solid card, no glowing shadow) */}
        {hoveredIdx !== null && points[hoveredIdx] && (
          <div
            className="absolute z-20 pointer-events-none bg-[#1a1c26] border border-[#363b4e] rounded p-3 shadow-md text-xs min-w-[190px] -translate-x-1/2 -translate-y-[120%]"
            style={{
              left: `${(points[hoveredIdx].x / width) * 100}%`,
              top: `${(points[hoveredIdx].y / height) * 100}%`
            }}
          >
            <div className="font-semibold text-[#f2f4f8] flex items-center justify-between border-b border-[#242735] pb-1.5 mb-2 font-mono-numbers">
              <span>{points[hoveredIdx].record.label}</span>
              <span className="text-[10px] text-[#9aa1b2]">
                {points[hoveredIdx].record.month}
              </span>
            </div>
            <div className="space-y-1 text-[#9aa1b2]">
              <div className="flex justify-between items-center">
                <span>Revenue:</span>
                <span className="font-mono-numbers font-semibold text-[#f2f4f8]">
                  {formatCurrency(points[hoveredIdx].record.revenue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Orders:</span>
                <span className="font-mono-numbers text-[#f2f4f8]">
                  {formatNumber(points[hoveredIdx].record.orders)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Units Sold:</span>
                <span className="font-mono-numbers text-[#f2f4f8]">
                  {formatNumber(points[hoveredIdx].record.units)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Basket AOV:</span>
                <span className="font-mono-numbers text-[#f2f4f8]">
                  {formatCurrency(points[hoveredIdx].record.aov)}
                </span>
              </div>
              {points[hoveredIdx].record.growthPercent !== null && (
                <div className="flex justify-between items-center pt-1 border-t border-[#242735]">
                  <span>MoM Growth:</span>
                  <span
                    className={`font-mono-numbers font-medium ${
                      (points[hoveredIdx].record.growthPercent ?? 0) >= 0
                        ? 'text-[#f2f4f8]'
                        : 'text-[#ef4444]'
                    }`}
                  >
                    {formatPercent(points[hoveredIdx].record.growthPercent)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer (Clean, unboxed editorial note) */}
      <div className="mt-4 pt-4 border-t border-[#242735] flex flex-wrap items-center justify-between text-xs text-[#9aa1b2]">
        <div className="flex items-center gap-3">
          <span className="text-[#f2f4f8] font-medium font-mono-numbers">
            Record Peak:
          </span>
          <span className="font-mono-numbers text-[#9aa1b2]">
            {peakItem?.label} — {formatCurrency(peakItem?.revenue ?? 0)}
          </span>
          <span className="text-[#363b4e] hidden sm:inline">/</span>
          <span className="hidden sm:inline">
            November represents 14.1% of all-time trade turnover
          </span>
        </div>

        <div className="text-[11px] text-[#676e82]">
          Click any month data point to filter dashboard
        </div>
      </div>
    </div>
  );
};
