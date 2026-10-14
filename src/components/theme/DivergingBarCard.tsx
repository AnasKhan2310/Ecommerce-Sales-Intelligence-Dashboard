import React from 'react';
import { ProductRecord } from '../../data/retailData';
import { formatCurrency } from '../../utils/formatters';

interface DivergingBarCardProps {
  products: ProductRecord[];
}

export const DivergingBarCard: React.FC<DivergingBarCardProps> = ({ products }) => {
  // Take top 6 products and display variance bars
  const items = products.slice(0, 6);

  const mockDiverging = [
    { label: 'DOTCOM', up: 85, down: 45, colorUp: '#ffbe3b', colorDown: '#00bac7' },
    { label: 'REGENCY', up: 60, down: 75, colorUp: '#00bac7', colorDown: '#ffbe3b' },
    { label: 'BIRDIE', up: 95, down: 30, colorUp: '#ffbe3b', colorDown: '#00bac7' },
    { label: 'HEART', up: 70, down: 85, colorUp: '#00bac7', colorDown: '#ffbe3b' },
    { label: 'BUNTING', up: 80, down: 40, colorUp: '#ffbe3b', colorDown: '#00bac7' },
    { label: 'JUMBO', up: 50, down: 65, colorUp: '#00bac7', colorDown: '#ffbe3b' }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Catalog Growth Variance
        </h3>
        <p className="text-[11px] text-slate-400">
          Positive demand index vs inventory dispatch velocity
        </p>
      </div>

      {/* Diverging Bar Chart (matching middle-left card in screenshot) */}
      <div className="relative h-36 my-3 flex items-center justify-between px-3">
        {/* Horizontal Cyan Baseline */}
        <div className="absolute left-0 right-0 h-1 bg-[#00bac7] z-10 rounded-full" />

        {mockDiverging.map((col, i) => (
          <div key={i} className="flex flex-col items-center h-full justify-center w-7 relative z-0">
            {/* Top Bar */}
            <div className="flex-1 flex items-end w-full justify-center pb-0.5">
              <div
                className="w-4 rounded-t-sm transition-all duration-300"
                style={{
                  height: `${col.up}%`,
                  backgroundColor: col.colorUp
                }}
              />
            </div>

            {/* Bottom Bar */}
            <div className="flex-1 flex items-start w-full justify-center pt-0.5">
              <div
                className="w-4 rounded-b-sm transition-all duration-300"
                style={{
                  height: `${col.down}%`,
                  backgroundColor: col.colorDown
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2 font-mono-numbers">
        <span>Top 6 Volume Lines</span>
        <span className="text-[#00bac7] font-semibold">Demand Equilibrium</span>
      </div>
    </div>
  );
};
