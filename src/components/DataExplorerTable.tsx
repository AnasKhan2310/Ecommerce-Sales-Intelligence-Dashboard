import React, { useState, useMemo } from 'react';
import { ProductRecord } from '../data/retailData';
import { formatCurrency, formatNumber, exportToCSV } from '../utils/formatters';
import { Download, Search, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DataExplorerTableProps {
  products: ProductRecord[];
  filterCategory: string;
}

export const DataExplorerTable: React.FC<DataExplorerTableProps> = ({
  products,
  filterCategory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof ProductRecord>('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filterCategory !== 'All Categories') {
      result = result.filter((p) => p.category === filterCategory);
    }

    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.description.toLowerCase().includes(q) ||
          p.stockCode.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'desc' ? valB - valA : valA - valB;
      }
      return sortOrder === 'desc'
        ? String(valB).localeCompare(String(valA))
        : String(valA).localeCompare(String(valB));
    });

    return result;
  }, [products, filterCategory, searchTerm, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedItems = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: keyof ProductRecord) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleExport = () => {
    const exportRows = filteredProducts.map((p, i) => ({
      Rank: i + 1,
      StockCode: p.stockCode,
      Description: p.description,
      Category: p.category,
      TotalRevenue_GBP: p.revenue,
      UnitsSold: p.unitsSold,
      TotalOrders: p.totalOrders,
      AvgUnitPrice_GBP: p.unitPriceAvg
    }));
    exportToCSV(`retail_catalog_ledger_${new Date().toISOString().slice(0, 10)}`, exportRows);
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800 tracking-tight">
            Catalog &amp; SKU Transaction Ledger
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Full transactional inventory records with live sorting and query search
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search SKU or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-full pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00bac7] w-[180px] sm:w-[220px]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#00bac7] hover:bg-[#00a8b5] text-white shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase font-mono-numbers text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="px-3 py-3">SKU Code</th>
              <th
                onClick={() => handleSort('description')}
                className="px-3 py-3 cursor-pointer hover:text-slate-800"
              >
                <div className="flex items-center gap-1">
                  Description
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('category')}
                className="px-3 py-3 cursor-pointer hover:text-slate-800"
              >
                <div className="flex items-center gap-1">
                  Category
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('revenue')}
                className="px-3 py-3 text-right cursor-pointer hover:text-slate-800"
              >
                <div className="flex items-center justify-end gap-1">
                  Revenue (£)
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('unitsSold')}
                className="px-3 py-3 text-right cursor-pointer hover:text-slate-800"
              >
                <div className="flex items-center justify-end gap-1">
                  Units Sold
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('totalOrders')}
                className="px-3 py-3 text-right cursor-pointer hover:text-slate-800"
              >
                <div className="flex items-center justify-end gap-1">
                  Invoices
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('unitPriceAvg')}
                className="px-3 py-3 text-right cursor-pointer hover:text-slate-800"
              >
                <div className="flex items-center justify-end gap-1">
                  Unit Price
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3 py-2.5 font-mono-numbers text-[#00929d] font-semibold">
                    {item.stockCode}
                  </td>
                  <td className="px-3 py-2.5 font-medium text-slate-900 max-w-[280px] truncate" title={item.description}>
                    {item.description}
                  </td>
                  <td className="px-3 py-2.5 text-slate-500">
                    {item.category}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono-numbers font-bold text-slate-900">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono-numbers text-slate-600">
                    {formatNumber(item.unitsSold)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono-numbers text-slate-600">
                    {formatNumber(item.totalOrders)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono-numbers text-slate-500">
                    {formatCurrency(item.unitPriceAvg)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-slate-400">
                  No merchandise items match search &quot;{searchTerm}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div>
          Showing page <span className="font-mono-numbers font-semibold text-slate-800">{page}</span> of{' '}
          <span className="font-mono-numbers font-semibold text-slate-800">{totalPages}</span> ({filteredProducts.length} items)
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-1 rounded-full bg-slate-100 text-slate-600 hover:text-[#00bac7] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-mono-numbers text-slate-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-1 rounded-full bg-slate-100 text-slate-600 hover:text-[#00bac7] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
