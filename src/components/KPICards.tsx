import React from 'react';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface KPICardsProps {
  revenue: number;
  orders: number;
  aov: number;
  customers: number;
  units: number;
  repeatRate?: number;
  isFiltered: boolean;
  baselineRevenue: number;
}

export const KPICards: React.FC<KPICardsProps> = ({
  revenue,
  orders,
  aov,
  customers,
  units,
  repeatRate = 65.58,
  isFiltered,
  baselineRevenue
}) => {
  const revenueShare = baselineRevenue > 0 ? (revenue / baselineRevenue) * 100 : 100;

  const metrics = [
    {
      id: 'revenue',
      label: 'Gross Volume',
      value: formatCurrency(revenue),
      detail: isFiltered ? `${revenueShare.toFixed(1)}% of portfolio` : 'Clean transaction sales'
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: formatNumber(orders),
      detail: `${(orders / (customers || 1)).toFixed(1)} orders / account`
    },
    {
      id: 'aov',
      label: 'Avg Order Value',
      value: formatCurrency(aov),
      detail: 'Basket size per invoice'
    },
    {
      id: 'customers',
      label: 'Unique Clients',
      value: formatNumber(customers),
      detail: 'Commercial accounts'
    },
    {
      id: 'units',
      label: 'Units Shipped',
      value: formatNumber(units),
      detail: `${orders > 0 ? Math.round(units / orders) : 0} items / basket`
    },
    {
      id: 'retention',
      label: 'Repeat Buyer Rate',
      value: `${repeatRate.toFixed(1)}%`,
      detail: '2,845 multi-order buyers'
    }
  ];

  return (
    <div className="border border-[#242735] bg-[#13151c] rounded-lg overflow-hidden mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#242735]">
        {metrics.map((metric) => (
          <div key={metric.id} className="p-4 sm:p-5 flex flex-col justify-between">
            <div className="text-[11px] font-medium uppercase tracking-wider text-[#9aa1b2] mb-2 font-mono-numbers">
              {metric.label}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-medium tracking-tight text-[#f2f4f8] font-mono-numbers">
                {metric.value}
              </div>
              <div className="text-[11px] text-[#676e82] mt-1 font-mono-numbers truncate">
                {metric.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
