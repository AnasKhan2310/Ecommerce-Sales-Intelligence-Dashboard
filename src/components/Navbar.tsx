import React from 'react';
import { Download, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenMethodology: () => void;
  onExportReport: () => void;
  totalRevenue: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  onOpenMethodology,
  onExportReport
}) => {
  const navItems = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'products', label: 'Merchandise Matrix' },
    { id: 'customers', label: 'Client Accounts & Geo' },
    { id: 'ledger', label: 'Transaction Ledger' }
  ];

  return (
    <header className="border-b border-[#242735] bg-[#0c0d12]">
      <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Clean solid typography, no shiny gradient, no logo orb) */}
        <div className="flex items-baseline gap-3 whitespace-nowrap shrink-0">
          <span className="font-serif-display text-lg font-medium tracking-tight text-[#f2f4f8]">
            Anas Khan
          </span>
          <span className="text-[#363b4e]">/</span>
          <span className="text-xs font-medium tracking-wide text-[#9aa1b2] uppercase font-mono-numbers">
            UK Retail Sales Intelligence
          </span>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#9aa1b2]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`transition-colors py-1 whitespace-nowrap shrink-0 ${
                activeSection === item.id
                  ? 'text-[#f2f4f8] font-semibold border-b border-[#f2f4f8]'
                  : 'hover:text-[#f2f4f8]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onOpenMethodology}
            className="flex items-center gap-1.5 text-[#9aa1b2] hover:text-[#f2f4f8] transition-colors whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Solid, high-contrast, zero glowing shadow) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onExportReport}
            className="px-3.5 py-1.5 text-xs font-medium bg-[#f2f4f8] text-[#0c0d12] hover:bg-white rounded transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
