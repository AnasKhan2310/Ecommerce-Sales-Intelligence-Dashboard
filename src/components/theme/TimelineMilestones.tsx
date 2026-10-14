import React from 'react';

export const TimelineMilestones: React.FC = () => {
  const milestones = [
    { label: 'Q1 Launch', subtitle: '£2.03M Volume', color: 'bg-[#00bac7] text-white', pos: 'top' },
    { label: 'Q2 Spring', subtitle: '£2.07M Stable', color: 'bg-[#ffbe3b] text-slate-900', pos: 'bottom' },
    { label: 'Q3 Ramp', subtitle: '£2.53M Surge', color: 'bg-[#00bac7] text-white', pos: 'top' },
    { label: 'Q4 Peak', subtitle: '£3.29M Holiday', color: 'bg-[#ffbe3b] text-slate-900', pos: 'bottom' }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Quarterly Wholesale Lifecycle
        </h3>
        <p className="text-[11px] text-slate-400">
          Seasonal order cycle progression from post-holiday baseline to Q4 surge
        </p>
      </div>

      {/* Horizontal milestone track with alternating badges (matching bottom card in screenshot) */}
      <div className="relative py-6 my-2">
        {/* Horizontal Purple Track Line */}
        <div className="h-1 w-full bg-[#5a57f6] rounded-full relative">
          <div className="absolute inset-0 bg-[#00bac7] w-3/4 rounded-full" />
        </div>

        {/* Milestone Nodes & Badges */}
        <div className="relative flex justify-between -mt-2">
          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center relative">
              {/* Top Tag */}
              {m.pos === 'top' && (
                <div className={`absolute -top-9 px-2.5 py-0.5 rounded text-[10px] font-bold shadow-xs whitespace-nowrap ${m.color}`}>
                  {m.label}
                  <div className="text-[9px] font-mono-numbers opacity-90">{m.subtitle}</div>
                </div>
              )}

              {/* Node on Line */}
              <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#5a57f6] z-10 shadow-xs" />

              {/* Bottom Tag */}
              {m.pos === 'bottom' && (
                <div className={`absolute -bottom-9 px-2.5 py-0.5 rounded text-[10px] font-bold shadow-xs whitespace-nowrap ${m.color}`}>
                  {m.label}
                  <div className="text-[9px] font-mono-numbers opacity-90">{m.subtitle}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Cycle Peak: Nov 2011</span>
        <span className="font-mono-numbers text-slate-600">34.6% Q4 Concentration</span>
      </div>
    </div>
  );
};
