import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHLY_DATA } from '../../data/retailData';

interface CalendarWidgetProps {
  currentMonth: string;
  onSelectMonth: (month: string) => void;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  currentMonth,
  onSelectMonth
}) => {
  const currentIdx = MONTHLY_DATA.findIndex((m) => m.month === currentMonth);
  const activeMonthRecord = currentIdx >= 0 ? MONTHLY_DATA[currentIdx] : MONTHLY_DATA[11]; // default Nov 2011

  const handlePrev = () => {
    if (currentIdx > 0) {
      onSelectMonth(MONTHLY_DATA[currentIdx - 1].month);
    }
  };

  const handleNext = () => {
    if (currentIdx < MONTHLY_DATA.length - 1 && currentIdx >= 0) {
      onSelectMonth(MONTHLY_DATA[currentIdx + 1].month);
    }
  };

  // Calendar dates representation
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  
  // High volume days to circle (matching circled days 14, 25, 28 in reference image)
  const highlightedDays: Record<number, { border: string; text: string }> = {
    14: { border: 'border-[#00bac7] text-[#00bac7]', text: 'Mid-Month Wholesale Order Drop' },
    25: { border: 'border-[#5a57f6] text-[#5a57f6]', text: 'Peak Holiday Invoicing' },
    28: { border: 'border-[#00bac7] text-[#00bac7]', text: 'Warehouse Dispatch Cutoff' }
  };

  // Grid for 30/31 days with offset
  const daysInMonth = 30;
  const startDayOffset = 2; // e.g. Tuesday

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
      {/* Calendar Header matching `< January >` in image */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <button
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="text-slate-400 hover:text-[#00bac7] disabled:opacity-30 p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-bold text-slate-800 tracking-wide font-mono-numbers">
          &lt; {activeMonthRecord.label} &gt;
        </span>

        <button
          onClick={handleNext}
          disabled={currentIdx === MONTHLY_DATA.length - 1}
          className="text-slate-400 hover:text-[#00bac7] disabled:opacity-30 p-1"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-[10px] text-slate-400 font-medium lowercase mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 text-center text-xs font-mono-numbers gap-y-1.5">
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const isHighlighted = highlightedDays[dayNum];

          return (
            <div key={dayNum} className="flex items-center justify-center py-0.5">
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-[11px] transition-transform ${
                  isHighlighted
                    ? `border-2 ${isHighlighted.border} font-bold scale-105 shadow-xs`
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title={isHighlighted?.text}
              >
                {dayNum}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend Note */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-[#00bac7]" />
          Key Dispatch Cycles
        </span>
        <span className="font-mono-numbers">
          {activeMonthRecord.orders} Invoices
        </span>
      </div>
    </div>
  );
};
