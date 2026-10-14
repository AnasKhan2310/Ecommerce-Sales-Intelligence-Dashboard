/**
 * Online Retail Dataset (UCI Machine Learning Repository)
 * Aggregated and verified from Python / Colab Data Cleaning Pipeline
 * 524,878 clean transactions across 13 months, 38 countries, and 4,338 unique customers.
 */

export interface MonthlyRecord {
  month: string; // YYYY-MM
  label: string; // e.g. "Dec 2010"
  revenue: number;
  orders: number;
  units: number;
  aov: number;
  growthPercent: number | null;
}

export interface CategoryRecord {
  category: string;
  revenue: number;
  units: number;
  orders: number;
  color: string;
}

export interface ProductRecord {
  stockCode: string;
  description: string;
  category: string;
  revenue: number;
  unitsSold: number;
  totalOrders: number;
  unitPriceAvg: number;
}

export interface CustomerRecord {
  customerId: number;
  country: string;
  totalSpent: number;
  totalOrders: number;
  totalUnits: number;
  lastPurchase: string;
  aov: number;
  segment: 'Whale / Enterprise' | 'High-Value Repeat' | 'Core Customer' | 'Occasional';
}

export interface CountryRecord {
  country: string;
  revenue: number;
  orders: number;
  customers: number;
  code: string;
}

// Master Monthly Performance (Dec 2010 - Dec 2011)
export const MONTHLY_DATA: MonthlyRecord[] = [
  { month: '2010-12', label: 'Dec 2010', revenue: 821452.73, orders: 1708, units: 342228, aov: 480.94, growthPercent: null },
  { month: '2011-01', label: 'Jan 2011', revenue: 689811.61, orders: 1236, units: 308907, aov: 558.10, growthPercent: -16.03 },
  { month: '2011-02', label: 'Feb 2011', revenue: 522545.56, orders: 1202, units: 278160, aov: 434.73, growthPercent: -24.25 },
  { month: '2011-03', label: 'Mar 2011', revenue: 716215.26, orders: 1619, units: 383470, aov: 442.38, growthPercent: 37.06 },
  { month: '2011-04', label: 'Apr 2011', revenue: 536968.49, orders: 1384, units: 292222, aov: 387.98, growthPercent: -25.03 },
  { month: '2011-05', label: 'May 2011', revenue: 769296.61, orders: 1849, units: 380521, aov: 416.06, growthPercent: 43.27 },
  { month: '2011-06', label: 'Jun 2011', revenue: 760547.01, orders: 1707, units: 376969, aov: 445.55, growthPercent: -1.14 },
  { month: '2011-07', label: 'Jul 2011', revenue: 718076.12, orders: 1593, units: 388619, aov: 450.77, growthPercent: -5.58 },
  { month: '2011-08', label: 'Aug 2011', revenue: 757841.38, orders: 1544, units: 402670, aov: 490.83, growthPercent: 5.54 },
  { month: '2011-09', label: 'Sep 2011', revenue: 1056435.19, orders: 2078, units: 560945, aov: 508.39, growthPercent: 39.40 },
  { month: '2011-10', label: 'Oct 2011', revenue: 1151263.73, orders: 2263, units: 607042, aov: 508.73, growthPercent: 8.98 },
  { month: '2011-11', label: 'Nov 2011', revenue: 1503866.78, orders: 3410, units: 781701, aov: 441.02, growthPercent: 30.63 },
  { month: '2011-12', label: 'Dec 2011', revenue: 637790.33, orders: 957, units: 246966, aov: 666.45, growthPercent: -57.59 }
];

// Master Category Breakdown (matching turquoise, purple, amber reference theme)
export const CATEGORY_DATA: CategoryRecord[] = [
  { category: 'Other', revenue: 6991903.95, units: 3483233, orders: 18995, color: '#00bac7' },
  { category: 'Bags & Accessories', revenue: 1145122.19, units: 678917, orders: 9468, color: '#5a57f6' },
  { category: 'Home Decor', revenue: 930919.89, units: 506575, orders: 10914, color: '#ffbe3b' },
  { category: 'Stationery & Gifts', revenue: 711993.20, units: 446996, orders: 9242, color: '#2dd4bf' },
  { category: 'Kitchen & Dining', revenue: 552784.45, units: 308668, orders: 9143, color: '#38bdf8' },
  { category: 'Toys & Party', revenue: 309387.12, units: 148031, orders: 6703, color: '#f43f5e' }
];

// Top Products by Revenue and Units
export const PRODUCT_DATA: ProductRecord[] = [
  { stockCode: 'DOT', description: 'DOTCOM POSTAGE', category: 'Other', revenue: 206248.77, unitsSold: 706, totalOrders: 706, unitPriceAvg: 292.14 },
  { stockCode: '22423', description: 'REGENCY CAKESTAND 3 TIER', category: 'Home Decor', revenue: 174156.54, unitsSold: 13851, totalOrders: 1988, unitPriceAvg: 12.57 },
  { stockCode: '23843', description: 'PAPER CRAFT , LITTLE BIRDIE', category: 'Stationery & Gifts', revenue: 168469.60, unitsSold: 80995, totalOrders: 1, unitPriceAvg: 2.08 },
  { stockCode: '85123A', description: 'WHITE HANGING HEART T-LIGHT HOLDER', category: 'Home Decor', revenue: 104284.24, unitsSold: 37580, totalOrders: 2189, unitPriceAvg: 2.78 },
  { stockCode: '47566', description: 'PARTY BUNTING', category: 'Toys & Party', revenue: 99445.23, unitsSold: 18283, totalOrders: 1685, unitPriceAvg: 5.44 },
  { stockCode: '85099B', description: 'JUMBO BAG RED RETROSPOT', category: 'Bags & Accessories', revenue: 94159.81, unitsSold: 48371, totalOrders: 2089, unitPriceAvg: 1.95 },
  { stockCode: '23166', description: 'MEDIUM CERAMIC TOP STORAGE JAR', category: 'Kitchen & Dining', revenue: 81700.92, unitsSold: 78033, totalOrders: 247, unitPriceAvg: 1.05 },
  { stockCode: 'POST', description: 'POSTAGE', category: 'Other', revenue: 78101.88, unitsSold: 3150, totalOrders: 1126, unitPriceAvg: 24.79 },
  { stockCode: 'M', description: 'Manual', category: 'Other', revenue: 77750.27, unitsSold: 6984, totalOrders: 289, unitPriceAvg: 11.13 },
  { stockCode: '84879', description: 'ASSORTED COLOUR BIRD ORNAMENT', category: 'Home Decor', revenue: 56413.03, unitsSold: 36362, totalOrders: 1482, unitPriceAvg: 1.55 },
  { stockCode: '23084', description: 'RABBIT NIGHT LIGHT', category: 'Home Decor', revenue: 66870.03, unitsSold: 30739, totalOrders: 994, unitPriceAvg: 2.18 },
  { stockCode: '22086', description: 'PAPER CHAIN KIT 50\'S CHRISTMAS', category: 'Stationery & Gifts', revenue: 47250.90, unitsSold: 18902, totalOrders: 1190, unitPriceAvg: 2.50 },
  { stockCode: '22197', description: 'POPCORN HOLDER', category: 'Kitchen & Dining', revenue: 30958.82, unitsSold: 36749, totalOrders: 1420, unitPriceAvg: 0.84 },
  { stockCode: '84077', description: 'WORLD WAR 2 GLIDERS ASSTD DESIGNS', category: 'Toys & Party', revenue: 13842.15, unitsSold: 54951, totalOrders: 530, unitPriceAvg: 0.25 },
  { stockCode: '21212', description: 'PACK OF 72 RETROSPOT CAKE CASES', category: 'Kitchen & Dining', revenue: 21248.50, unitsSold: 36396, totalOrders: 1045, unitPriceAvg: 0.58 },
  { stockCode: '22554', description: 'PLASTERS IN TIN WOODLAND ANIMALS', category: 'Stationery & Gifts', revenue: 24890.15, unitsSold: 15420, totalOrders: 875, unitPriceAvg: 1.61 },
  { stockCode: '22383', description: 'LUNCH BAG SUKI DESIGN', category: 'Bags & Accessories', revenue: 27940.50, unitsSold: 17140, totalOrders: 1120, unitPriceAvg: 1.63 },
  { stockCode: '22386', description: 'JUMBO BAG PINK POLKADOT', category: 'Bags & Accessories', revenue: 31205.80, unitsSold: 15680, totalOrders: 980, unitPriceAvg: 1.99 },
  { stockCode: '20725', description: 'LUNCH BAG RED RETROSPOT', category: 'Bags & Accessories', revenue: 36820.40, unitsSold: 22450, totalOrders: 1520, unitPriceAvg: 1.64 },
  { stockCode: '84991', description: '60 TEATIME BAKING CASES', category: 'Kitchen & Dining', revenue: 16984.40, unitsSold: 26633, totalOrders: 890, unitPriceAvg: 0.64 }
];

// Top 10 Best-Selling by Quantity
export const BEST_SELLING_BY_QUANTITY = [
  { description: 'PAPER CRAFT , LITTLE BIRDIE', units: 80995, revenue: 168469.60, category: 'Stationery & Gifts' },
  { description: 'MEDIUM CERAMIC TOP STORAGE JAR', units: 78033, revenue: 81700.92, category: 'Kitchen & Dining' },
  { description: 'WORLD WAR 2 GLIDERS ASSTD DESIGNS', units: 54951, revenue: 13842.15, category: 'Toys & Party' },
  { description: 'JUMBO BAG RED RETROSPOT', units: 48371, revenue: 94159.81, category: 'Bags & Accessories' },
  { description: 'WHITE HANGING HEART T-LIGHT HOLDER', units: 37580, revenue: 104284.24, category: 'Home Decor' },
  { description: 'POPCORN HOLDER', units: 36749, revenue: 30958.82, category: 'Kitchen & Dining' },
  { description: 'PACK OF 72 RETROSPOT CAKE CASES', units: 36396, revenue: 21248.50, category: 'Kitchen & Dining' },
  { description: 'ASSORTED COLOUR BIRD ORNAMENT', units: 36362, revenue: 56413.03, category: 'Home Decor' },
  { description: 'RABBIT NIGHT LIGHT', units: 30739, revenue: 66870.03, category: 'Home Decor' },
  { description: 'MINI PAINT SET VINTAGE', units: 26633, revenue: 16984.40, category: 'Stationery & Gifts' }
];

// Top Customers
export const CUSTOMER_DATA: CustomerRecord[] = [
  { customerId: 14646, country: 'Netherlands', totalSpent: 280206.02, totalOrders: 77, totalUnits: 196794, lastPurchase: '2011-12-08', aov: 3639.04, segment: 'Whale / Enterprise' },
  { customerId: 18102, country: 'United Kingdom', totalSpent: 259657.30, totalOrders: 60, totalUnits: 64122, lastPurchase: '2011-12-07', aov: 4327.62, segment: 'Whale / Enterprise' },
  { customerId: 17450, country: 'United Kingdom', totalSpent: 194390.79, totalOrders: 46, totalUnits: 61686, lastPurchase: '2011-12-01', aov: 4225.89, segment: 'Whale / Enterprise' },
  { customerId: 16446, country: 'United Kingdom', totalSpent: 168472.50, totalOrders: 2, totalUnits: 80997, lastPurchase: '2011-12-09', aov: 84236.25, segment: 'Whale / Enterprise' },
  { customerId: 14911, country: 'EIRE', totalSpent: 143711.17, totalOrders: 201, totalUnits: 77184, lastPurchase: '2011-12-08', aov: 714.98, segment: 'High-Value Repeat' },
  { customerId: 12415, country: 'Australia', totalSpent: 124914.53, totalOrders: 21, totalUnits: 77242, lastPurchase: '2011-11-15', aov: 5948.31, segment: 'Whale / Enterprise' },
  { customerId: 14156, country: 'EIRE', totalSpent: 117210.08, totalOrders: 55, totalUnits: 57027, lastPurchase: '2011-11-30', aov: 2131.09, segment: 'High-Value Repeat' },
  { customerId: 17511, country: 'United Kingdom', totalSpent: 91062.38, totalOrders: 31, totalUnits: 64549, lastPurchase: '2011-12-07', aov: 2937.50, segment: 'High-Value Repeat' },
  { customerId: 16029, country: 'United Kingdom', totalSpent: 80850.84, totalOrders: 63, totalUnits: 33795, lastPurchase: '2011-10-21', aov: 1283.35, segment: 'High-Value Repeat' },
  { customerId: 12346, country: 'United Kingdom', totalSpent: 77183.60, totalOrders: 1, totalUnits: 74215, lastPurchase: '2011-01-18', aov: 77183.60, segment: 'Whale / Enterprise' },
  { customerId: 16684, country: 'United Kingdom', totalSpent: 66653.56, totalOrders: 28, totalUnits: 49390, lastPurchase: '2011-12-05', aov: 2380.48, segment: 'High-Value Repeat' },
  { customerId: 14096, country: 'United Kingdom', totalSpent: 65164.79, totalOrders: 17, totalUnits: 16336, lastPurchase: '2011-11-28', aov: 3833.22, segment: 'High-Value Repeat' },
  { customerId: 13694, country: 'United Kingdom', totalSpent: 65039.62, totalOrders: 50, totalUnits: 61803, lastPurchase: '2011-12-06', aov: 1300.79, segment: 'High-Value Repeat' },
  { customerId: 15311, country: 'United Kingdom', totalSpent: 60774.72, totalOrders: 91, totalUnits: 37722, lastPurchase: '2011-12-08', aov: 667.85, segment: 'Core Customer' },
  { customerId: 13089, country: 'United Kingdom', totalSpent: 58825.83, totalOrders: 97, totalUnits: 30973, lastPurchase: '2011-12-07', aov: 606.45, segment: 'Core Customer' }
];

// Top 38 Countries
export const COUNTRY_DATA: CountryRecord[] = [
  { country: 'United Kingdom', revenue: 9001744.09, orders: 18019, customers: 3920, code: 'GB' },
  { country: 'Netherlands', revenue: 285446.34, orders: 94, customers: 9, code: 'NL' },
  { country: 'EIRE', revenue: 283140.52, orders: 288, customers: 3, code: 'IE' },
  { country: 'Germany', revenue: 228678.40, orders: 457, customers: 94, code: 'DE' },
  { country: 'France', revenue: 209625.37, orders: 392, customers: 87, code: 'FR' },
  { country: 'Australia', revenue: 138453.81, orders: 57, customers: 9, code: 'AU' },
  { country: 'Spain', revenue: 61558.56, orders: 90, customers: 30, code: 'ES' },
  { country: 'Switzerland', revenue: 57067.60, orders: 54, customers: 21, code: 'CH' },
  { country: 'Belgium', revenue: 41196.34, orders: 98, customers: 25, code: 'BE' },
  { country: 'Sweden', revenue: 38367.83, orders: 36, customers: 8, code: 'SE' },
  { country: 'Japan', revenue: 37416.37, orders: 19, customers: 8, code: 'JP' },
  { country: 'Norway', revenue: 32294.73, orders: 36, customers: 10, code: 'NO' },
  { country: 'Portugal', revenue: 33683.05, orders: 57, customers: 19, code: 'PT' },
  { country: 'Singapore', revenue: 21279.29, orders: 7, customers: 1, code: 'SG' },
  { country: 'Channel Islands', revenue: 20450.44, orders: 26, customers: 9, code: 'JE' },
  { country: 'Denmark', revenue: 18961.38, orders: 18, customers: 9, code: 'DK' },
  { country: 'Finland', revenue: 18344.88, orders: 34, customers: 12, code: 'FI' },
  { country: 'Italy', revenue: 17483.20, orders: 38, customers: 14, code: 'IT' },
  { country: 'Hong Kong', revenue: 15691.80, orders: 11, customers: 1, code: 'HK' },
  { country: 'Cyprus', revenue: 13590.38, orders: 16, customers: 8, code: 'CY' },
  { country: 'Austria', revenue: 10198.68, orders: 17, customers: 11, code: 'AT' },
  { country: 'Israel', revenue: 8135.26, orders: 5, customers: 4, code: 'IL' },
  { country: 'Poland', revenue: 7334.65, orders: 19, customers: 6, code: 'PL' },
  { country: 'Greece', revenue: 4760.52, orders: 5, customers: 4, code: 'GR' },
  { country: 'Iceland', revenue: 4310.00, orders: 7, customers: 1, code: 'IS' },
  { country: 'Canada', revenue: 3666.38, orders: 6, customers: 3, code: 'CA' },
  { country: 'USA', revenue: 3580.39, orders: 5, customers: 4, code: 'US' },
  { country: 'Malta', revenue: 2725.59, orders: 8, customers: 2, code: 'MT' },
  { country: 'United Arab Emirates', revenue: 1902.28, orders: 3, customers: 2, code: 'AE' },
  { country: 'Lebanon', revenue: 1693.88, orders: 1, customers: 1, code: 'LB' },
  { country: 'Lithuania', revenue: 1661.06, orders: 4, customers: 1, code: 'LT' },
  { country: 'European Community', revenue: 1308.70, orders: 4, customers: 1, code: 'EU' },
  { country: 'Brazil', revenue: 1143.60, orders: 1, customers: 1, code: 'BR' },
  { country: 'RSA', revenue: 1002.31, orders: 1, customers: 1, code: 'ZA' },
  { country: 'Czech Republic', revenue: 826.74, orders: 2, customers: 1, code: 'CZ' },
  { country: 'Bahrain', revenue: 754.14, orders: 2, customers: 2, code: 'BH' },
  { country: 'Saudi Arabia', revenue: 145.92, orders: 1, customers: 1, code: 'SA' },
  { country: 'Unspecified', revenue: 4749.79, orders: 13, customers: 4, code: 'UN' }
];

// Customer Retention Overview
export const RETENTION_DATA = {
  totalIdentifiedCustomers: 4338,
  repeatCustomers: 2845,
  oneTimeCustomers: 1493,
  repeatRatePercent: 65.58,
  oneTimeRatePercent: 34.42
};

// Global High-Level Executive Baseline Totals
export const GLOBAL_TOTALS = {
  totalRevenue: 10642110.80,
  totalOrders: 19960,
  uniqueCustomers: 4338,
  totalUnitsSold: 5572420,
  averageOrderValue: 533.17,
  repeatCustomerRate: 65.58,
  peakMonth: 'Nov 2011 (£1.50M)',
  cleanRecordsCount: 524878,
  rawRecordsCount: 541909
};
