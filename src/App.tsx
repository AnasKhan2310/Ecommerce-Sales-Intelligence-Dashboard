import React, { useState, useMemo } from 'react';
import {
  MONTHLY_DATA,
  CATEGORY_DATA,
  PRODUCT_DATA,
  COUNTRY_DATA,
  GLOBAL_TOTALS,
  MonthlyRecord,
  ProductRecord,
  CategoryRecord
} from './data/retailData';
import { exportToCSV } from './utils/formatters';
import { Sidebar } from './components/theme/Sidebar';
import { TopBar } from './components/theme/TopBar';
import { MetricWaveCard } from './components/theme/MetricWaveCard';
import { DualWaveChart } from './components/theme/DualWaveChart';
import { CircularGaugeCard } from './components/theme/CircularGaugeCard';
import { CalendarWidget } from './components/theme/CalendarWidget';
import { CategoryGroupedBars } from './components/theme/CategoryGroupedBars';
import { TimelineMilestones } from './components/theme/TimelineMilestones';
import { DivergingBarCard } from './components/theme/DivergingBarCard';
import { DataExplorerTable } from './components/DataExplorerTable';
import { MethodologyModal } from './components/MethodologyModal';
import { FilterState } from './components/FilterBar';
import { Sparkles, Layers, FileSpreadsheet } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    country: 'All Countries',
    month: 'All Months',
    category: 'All Categories',
    searchQuery: ''
  });

  const handleResetFilters = () => {
    setFilters({
      country: 'All Countries',
      month: 'All Months',
      category: 'All Categories',
      searchQuery: ''
    });
  };

  // Dynamic filter computation
  const {
    filteredRevenue,
    filteredOrders,
    filteredCustomers,
    filteredUnits,
    filteredAOV,
    filteredMonthly,
    filteredProducts,
    filteredCategories
  } = useMemo(() => {
    const hasFilter =
      filters.country !== 'All Countries' ||
      filters.month !== 'All Months' ||
      filters.category !== 'All Categories' ||
      filters.searchQuery.trim() !== '';

    let countryRatio = 1.0;
    if (filters.country !== 'All Countries') {
      const c = COUNTRY_DATA.find((item) => item.country === filters.country);
      if (c) {
        countryRatio = c.revenue / GLOBAL_TOTALS.totalRevenue;
      }
    }

    let categoryRatio = 1.0;
    if (filters.category !== 'All Categories') {
      const cat = CATEGORY_DATA.find((item) => item.category === filters.category);
      if (cat) {
        categoryRatio = cat.revenue / GLOBAL_TOTALS.totalRevenue;
      }
    }

    let monthRatio = 1.0;
    if (filters.month !== 'All Months') {
      const m = MONTHLY_DATA.find((item) => item.month === filters.month);
      if (m) {
        monthRatio = m.revenue / GLOBAL_TOTALS.totalRevenue;
      }
    }

    // Dynamic Monthly dataset
    let monthly: MonthlyRecord[] = MONTHLY_DATA.map((m) => {
      let rev = m.revenue;
      let ord = m.orders;
      let unt = m.units;

      if (filters.country !== 'All Countries') {
        rev = rev * countryRatio;
        ord = Math.max(Math.round(ord * countryRatio), 1);
        unt = Math.max(Math.round(unt * countryRatio), 1);
      }
      if (filters.category !== 'All Categories') {
        rev = rev * categoryRatio;
        ord = Math.max(Math.round(ord * categoryRatio), 1);
        unt = Math.max(Math.round(unt * categoryRatio), 1);
      }

      return {
        ...m,
        revenue: rev,
        orders: ord,
        units: unt,
        aov: rev / (ord || 1)
      };
    });

    if (filters.month !== 'All Months') {
      monthly = monthly.filter((m) => m.month === filters.month);
    }

    // Filtered Products
    let prods: ProductRecord[] = [...PRODUCT_DATA];
    if (filters.category !== 'All Categories') {
      prods = prods.filter((p) => p.category === filters.category);
    }
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      prods = prods.filter(
        (p) =>
          p.description.toLowerCase().includes(q) ||
          p.stockCode.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (filters.country !== 'All Countries' || filters.month !== 'All Months') {
      const factor = countryRatio * monthRatio;
      prods = prods.map((p) => ({
        ...p,
        revenue: p.revenue * factor,
        unitsSold: Math.max(Math.round(p.unitsSold * factor), 1),
        totalOrders: Math.max(Math.round(p.totalOrders * factor), 1)
      }));
    }

    prods.sort((a, b) => b.revenue - a.revenue);

    // Filtered Categories
    let cats: CategoryRecord[] = CATEGORY_DATA.map((c) => {
      let rev = c.revenue;
      let ord = c.orders;
      let unt = c.units;
      if (filters.country !== 'All Countries') {
        rev = rev * countryRatio;
        ord = Math.max(Math.round(ord * countryRatio), 1);
        unt = Math.max(Math.round(unt * countryRatio), 1);
      }
      if (filters.month !== 'All Months') {
        rev = rev * monthRatio;
        ord = Math.max(Math.round(ord * monthRatio), 1);
        unt = Math.max(Math.round(unt * monthRatio), 1);
      }
      return { ...c, revenue: rev, orders: ord, units: unt };
    });

    if (filters.category !== 'All Categories') {
      cats = cats.filter((c) => c.category === filters.category);
    }

    let revTotal = GLOBAL_TOTALS.totalRevenue;
    let ordTotal = GLOBAL_TOTALS.totalOrders;
    let custTotal = GLOBAL_TOTALS.uniqueCustomers;
    let untTotal = GLOBAL_TOTALS.totalUnitsSold;

    if (hasFilter) {
      if (filters.month !== 'All Months' && monthly.length > 0) {
        revTotal = monthly[0].revenue;
        ordTotal = monthly[0].orders;
        untTotal = monthly[0].units;
        custTotal = Math.max(Math.round(GLOBAL_TOTALS.uniqueCustomers * monthRatio * countryRatio), 1);
      } else {
        const factor = countryRatio * categoryRatio * monthRatio;
        revTotal = GLOBAL_TOTALS.totalRevenue * factor;
        ordTotal = Math.max(Math.round(GLOBAL_TOTALS.totalOrders * factor), 1);
        untTotal = Math.max(Math.round(GLOBAL_TOTALS.totalUnitsSold * factor), 1);
        custTotal = Math.max(Math.round(GLOBAL_TOTALS.uniqueCustomers * Math.min(countryRatio, 1)), 1);
      }
    }

    const aov = ordTotal > 0 ? revTotal / ordTotal : 0;

    return {
      filteredRevenue: revTotal,
      filteredOrders: ordTotal,
      filteredCustomers: custTotal,
      filteredUnits: untTotal,
      filteredAOV: aov,
      filteredMonthly: monthly,
      filteredProducts: prods,
      filteredCategories: cats
    };
  }, [filters]);

  const handleExportFullReport = () => {
    const reportData = filteredMonthly.map((m) => ({
      Month: m.month,
      Label: m.label,
      Revenue_GBP: m.revenue,
      Orders: m.orders,
      UnitsSold: m.units,
      AOV_GBP: m.aov,
      MoM_Growth: m.growthPercent ?? 0
    }));
    exportToCSV(`retail_report_${filters.month}_${filters.country}`, reportData);
  };

  return (
    <div className="min-h-screen bg-[#e8f5f6] text-slate-800 flex">
      {/* 1. Left Turquoise Navigation Rail (exact match to screenshot) */}
      <Sidebar
        activeTab={showLedger ? 'ledger' : activeTab}
        onSelectTab={(tab) => {
          if (tab === 'ledger') {
            setShowLedger(true);
          } else {
            setShowLedger(false);
            setActiveTab(tab);
          }
        }}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onExportReport={handleExportFullReport}
      />

      {/* 2. Main Canvas */}
      <div className="flex-1 flex flex-col p-3 sm:p-6 overflow-x-hidden max-w-[1500px]">
        {/* Top Bar with Search & Month Navigation */}
        <TopBar
          filters={filters}
          onChange={setFilters}
          onReset={handleResetFilters}
        />

        {/* Quick Filter Presets Strip */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ffbe3b]" />
            Presets:
          </span>
          <button
            onClick={() => handleResetFilters()}
            className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#00bac7] border border-slate-200/80 shadow-xs transition-colors"
          >
            All 524k Records
          </button>
          <button
            onClick={() => setFilters({ ...filters, country: 'United Kingdom' })}
            className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#00bac7] border border-slate-200/80 shadow-xs transition-colors"
          >
            UK Domestic (84.6%)
          </button>
          <button
            onClick={() => setFilters({ ...filters, country: 'Netherlands' })}
            className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#00bac7] border border-slate-200/80 shadow-xs transition-colors"
          >
            Top Export (Netherlands)
          </button>
          <button
            onClick={() => setFilters({ ...filters, month: '2011-11' })}
            className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#00bac7] border border-slate-200/80 shadow-xs transition-colors"
          >
            Nov 2011 Peak (£1.50M)
          </button>
          <button
            onClick={() => setFilters({ ...filters, category: 'Home Decor' })}
            className="px-3 py-1 rounded-full bg-white text-slate-700 hover:text-[#00bac7] border border-slate-200/80 shadow-xs transition-colors"
          >
            Home Decor
          </button>
          <button
            onClick={() => setShowLedger(!showLedger)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00bac7] hover:bg-[#00a8b5] text-white shadow-xs font-medium transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{showLedger ? 'Hide Ledger' : 'View Full Ledger Table'}</span>
          </button>
        </div>

        {/* View Mode: Ledger Table View */}
        {showLedger ? (
          <div className="space-y-6">
            <DataExplorerTable
              products={filteredProducts}
              filterCategory={filters.category}
            />
          </div>
        ) : (
          /* View Mode: Dashboard Grid (matching image layout) */
          <div className="space-y-6">
            {/* Row 1: 3-Column Layout
                Left: Metric Waves (Gross Revenue with purple curve & Orders/AOV sparklines)
                Middle: Calendar Widget (< January > calendar)
                Right: Circular Gauges (Dual 25K/90K rings + 75% retention gauge with amber button) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column (4 cols) */}
              <div className="md:col-span-4">
                <MetricWaveCard
                  revenue={filteredRevenue}
                  orders={filteredOrders}
                  aov={filteredAOV}
                  peakLabel="Nov Peak"
                />
              </div>

              {/* Middle Column (4 cols) - Calendar Widget */}
              <div className="md:col-span-4">
                <CalendarWidget
                  currentMonth={filters.month}
                  onSelectMonth={(m) => setFilters({ ...filters, month: m })}
                />
              </div>

              {/* Right Column (4 cols) - Circular Gauges */}
              <div className="md:col-span-4">
                <CircularGaugeCard
                  repeatRate={filters.country === 'All Countries' ? 65.58 : 62.4}
                  uniqueCustomers={filteredCustomers}
                  averageOrderValue={filteredAOV}
                  onExploreCustomers={() => setShowLedger(true)}
                />
              </div>
            </div>

            {/* Row 2: 2-Column Layout
                Left: Diverging Bar Chart ("Consectetuer")
                Right: Large Dual-Wave Smooth Curve Chart ("Dolor sit amet" with purple & yellow curves) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <DivergingBarCard products={filteredProducts} />
              </div>

              <div className="lg:col-span-8">
                <DualWaveChart
                  data={filteredMonthly}
                  activeMonth={filters.month}
                  onSelectMonth={(m) => setFilters({ ...filters, month: m })}
                />
              </div>
            </div>

            {/* Row 3: 2-Column Layout
                Left: Milestone Timeline ("Lorem ipsum" with alternating cyan/yellow badges)
                Right: 3-Color Grouped Bar Chart ("Adipiscing" in purple, cyan, yellow) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <TimelineMilestones />
              </div>

              <div className="lg:col-span-6">
                <CategoryGroupedBars
                  categories={filteredCategories}
                  activeCategory={filters.category}
                  onSelectCategory={(c) => setFilters({ ...filters, category: c })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Clean Footer */}
        <footer className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Ecommerce Sales Intelligence</span>
            <span>·</span>
            <span>Portfolio Project by Anas Khan</span>
            <span>·</span>
            <span>524,878 Transactions Cleaned</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="hover:text-[#00bac7] transition-colors font-medium"
            >
              Methodology &amp; Colab Pipeline
            </button>
            <span>·</span>
            <button
              onClick={handleExportFullReport}
              className="hover:text-[#00bac7] transition-colors font-medium"
            >
              Export Report CSV
            </button>
          </div>
        </footer>
      </div>

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />
    </div>
  );
}
