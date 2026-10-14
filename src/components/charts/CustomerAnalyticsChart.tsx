import React, { useState } from 'react';
import { CUSTOMER_DATA, RETENTION_DATA } from '../../data/retailData';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const CustomerAnalyticsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whales' | 'retention'>('whales');
  const [hoveredCustomer, setHoveredCustomer] = useState<number | null>(null);

  const top10Customers = CUSTOMER_DATA.slice(0, 10);
  const maxSpend = Math.max(...top10Customers.map((c) => c.totalSpent), 1);

  return (
    <div className="bg-[#13151c] border border-[#242735] rounded-lg p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-5 pb-4 border-b border-[#242735]">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9aa1b2] font-mono-numbers">
              Client Cohorts &amp; Loyalty
            </span>
            <h3 className="font-serif-display text-xl font-normal text-[#f2f4f8] tracking-tight mt-0.5">
              Account Value &amp; Buyer Retention
            </h3>
            <p className="text-xs text-[#9aa1b2] mt-0.5">
              Wholesale account concentration across 4,338 identified commercial clients
            </p>
          </div>

          <div className="flex items-center bg-[#1a1c26] p-1 rounded border border-[#242735] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('whales')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === 'whales'
                  ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                  : 'text-[#9aa1b2] hover:text-[#f2f4f8]'
              }`}
            >
              Top Wholesalers
            </button>
            <button
              onClick={() => setActiveTab('retention')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === 'retention'
                  ? 'bg-[#f2f4f8] text-[#0c0d12] font-semibold'
                  : 'text-[#9aa1b2] hover:text-[#f2f4f8]'
              }`}
            >
              Retention Split
            </button>
          </div>
        </div>

        {activeTab === 'whales' ? (
          <div className="space-y-3">
            {top10Customers.map((customer, index) => {
              const percentage = (customer.totalSpent / maxSpend) * 100;
              const isHovered = hoveredCustomer === customer.customerId;

              return (
                <div
                  key={customer.customerId}
                  className="group relative"
                  onMouseEnter={() => setHoveredCustomer(customer.customerId)}
                  onMouseLeave={() => setHoveredCustomer(null)}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono-numbers text-[#676e82] text-[11px] w-5 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono-numbers font-medium text-[#f2f4f8]">
                        Account #{customer.customerId}
                      </span>
                      <span className="text-[#676e82] text-[11px] truncate">
                        · {customer.country}
                      </span>
                      <span className="text-[10px] text-[#676e82] hidden md:inline font-mono-numbers">
                        ({customer.totalOrders} invoices)
                      </span>
                    </div>

                    <span className="font-mono-numbers font-medium text-[#f2f4f8] shrink-0">
                      {formatCurrency(customer.totalSpent)}
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-[#1a1c26] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${
                        index === 0
                          ? 'bg-[#f2f4f8]'
                          : index < 3
                          ? 'bg-[#c6cbd6]'
                          : 'bg-[#70778c]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  {isHovered && (
                    <div className="absolute right-0 bottom-full mb-1 z-30 bg-[#1a1c26] border border-[#363b4e] rounded p-2.5 shadow-md text-[11px] pointer-events-none min-w-[210px]">
                      <div className="font-semibold text-[#f2f4f8] border-b border-[#242735] pb-1 mb-1.5 flex justify-between font-mono-numbers">
                        <span>Account #{customer.customerId}</span>
                        <span className="text-[#9aa1b2]">{customer.country}</span>
                      </div>
                      <div className="space-y-0.5 text-[#9aa1b2]">
                        <div className="flex justify-between">
                          <span>Total Spend:</span>
                          <span className="font-mono-numbers text-[#f2f4f8]">
                            {formatCurrency(customer.totalSpent)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Orders:</span>
                          <span className="font-mono-numbers text-[#f2f4f8]">{customer.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Units:</span>
                          <span className="font-mono-numbers text-[#f2f4f8]">{formatNumber(customer.totalUnits)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg Basket:</span>
                          <span className="font-mono-numbers text-[#f2f4f8]">{formatCurrency(customer.aov)}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-[#242735]">
                          <span>Segment:</span>
                          <span className="text-[#f2f4f8] font-medium">{customer.segment}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center justify-center p-4 bg-[#1a1c26] rounded border border-[#242735] text-center">
                <div className="relative w-32 h-32 mb-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#242735"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f2f4f8"
                      strokeWidth="12"
                      strokeDasharray={`${(RETENTION_DATA.repeatRatePercent / 100) * 251.3} 251.3`}
                      strokeDashoffset="0"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-medium font-mono-numbers text-[#f2f4f8]">
                      {RETENTION_DATA.repeatRatePercent}%
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#9aa1b2] font-mono-numbers">
                      Repeat Ratio
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-[#9aa1b2] font-mono-numbers">
                  {formatNumber(RETENTION_DATA.totalIdentifiedCustomers)} Total Identified Accounts
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#1a1c26] rounded border border-[#242735]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-[#f2f4f8]">
                      Repeat Accounts (≥ 2 orders)
                    </span>
                    <span className="font-mono-numbers font-medium text-[#f2f4f8]">
                      {formatNumber(RETENTION_DATA.repeatCustomers)}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#9aa1b2]">
                    Generates 88.4% of lifetime commercial volume
                  </div>
                </div>

                <div className="p-3.5 bg-[#1a1c26] rounded border border-[#242735]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-[#9aa1b2]">
                      One-Time Accounts (1 order)
                    </span>
                    <span className="font-mono-numbers text-[#9aa1b2]">
                      {formatNumber(RETENTION_DATA.oneTimeCustomers)}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#676e82]">
                    34.4% exploratory / seasonal buyer segment
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-[#242735] flex items-center justify-between text-xs text-[#9aa1b2]">
        <span>Top client: Account #14646 ({formatCurrency(280206.02, true)})</span>
        <span className="font-mono-numbers text-[#f2f4f8]">65.6% Repeat Base</span>
      </div>
    </div>
  );
};
