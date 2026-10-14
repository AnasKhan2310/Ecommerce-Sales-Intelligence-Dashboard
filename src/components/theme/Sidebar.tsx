import React from 'react';
import { Home, MessageSquare, Star, Sliders, Table, LogOut, Download } from 'lucide-react';

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
        {/* User Avatar Circle (matching reference image) */}
        <div
          onClick={onOpenMethodology}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-0.5 shadow-sm cursor-pointer hover:scale-105 transition-transform flex items-center justify-center overflow-hidden border-2 border-white/80"
          title="Anas Khan - Portfolio Overview"
        >
          <img
            src="/src/assets/images/portfolio_author_avatar_1791976544191.jpg"
            alt="Anas Khan"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
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
