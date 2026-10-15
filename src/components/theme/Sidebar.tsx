import React from 'react';
import { Home, MessageSquare, Star, Sliders, Table, LogOut, Download, User } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMethodology: () => void;
  onExportReport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenMethodology,
  onExportReport
}) => {
  const navItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'highlights', icon: Star, label: 'Highlights' },
    { id: 'products', icon: Sliders, label: 'Merchandise' },
    { id: 'ledger', icon: Table, label: 'Ledger' },
    { id: 'methodology', icon: MessageSquare, label: 'Methodology' }
  ];

  return (
    <aside className="w-16 sm:w-20 bg-[#00bac7] flex flex-col items-center justify-between py-6 shrink-0 shadow-lg select-none rounded-r-3xl my-2 ml-2 transition-all">
      {/* Top Section: Avatar */}
      <div className="flex flex-col items-center gap-6">
        {/* User Icon Circle (matching reference image: white circle with amber user silhouette) */}
        <div
          onClick={onOpenMethodology}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-sm cursor-pointer hover:scale-105 transition-transform flex items-center justify-center border-2 border-white/80"
          title="Portfolio Overview & Methodology"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffbe3b]/20 flex items-center justify-center">
            <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#eab308] fill-[#eab308]" />
          </div>
        </div>

        {/* Navigation Icon List */}
        <nav className="flex flex-col items-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'methodology') {
                    onOpenMethodology();
                  } else {
                    onSelectTab(item.id);
                  }
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-white text-[#00bac7] shadow-md scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Download / Export Icon (matching logout icon in image) */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onExportReport}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all"
          title="Export CSV Dataset"
        >
          <Download className="w-5 h-5 stroke-[2.2]" />
        </button>
      </div>
    </aside>
  );
};
