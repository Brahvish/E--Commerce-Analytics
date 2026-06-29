const kpis = {
  totalRevenue: {
    value: 458230,
    formatted: "$458,230",
    change: 12.5,
    changeType: "increase",
    label: "Total Revenue"
  },
  totalProfit: {
    value: 96846,
    formatted: "$96,846",
    change: 8.4,
    changeType: "increase",
    label: "Total Profit"
  },
  totalOrders: {
    value: 2345,
    formatted: "2,345",
    change: 15.2,
    changeType: "increase",
    label: "Total Orders"
  },
  avgOrderValue: {
    value: 195.60,
    formatted: "$195.60",
    change: 4.1,
    changeType: "increase",
    label: "Avg. Order Value"
  }
};

const salesOverview = [
  { month: "Dec", value: 45000 },
  { month: "Jan", value: 68000 },
  { month: "Feb", value: 55000 },
  { month: "Mar", value: 60000 },
  { month: "Apr", value: 112000 },
  { month: "May", value: 64000 }
];

const salesByCategory = {
  total: "$458,230",
  categories: [
    { name: "Electronics", percentage: 32, color: "bg-primary" },
    { name: "Fashion", percentage: 24, color: "bg-tertiary" },
    { name: "Home & Living", percentage: 18, color: "bg-[#f48c06]" },
    { name: "Beauty", percentage: 12, color: "bg-[#9b5de5]" },
    { name: "Other", percentage: 14, color: "bg-gray-400" }
  ]
};

const topProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    revenue: "$45,231",
    profit: "$12,432 Profit",
    icon: "headphones"
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    category: "Electronics",
    revenue: "$38,921",
    profit: "$10,231 Profit",
    icon: "watch"
  },
  {
    id: 3,
    name: "Leather Backpack",
    category: "Fashion",
    revenue: "$28,421",
    profit: "$8,112 Profit",
    icon: "backpack"
  }
];

const topCustomers = [
  {
    id: 1,
    name: "Robert Fox",
    orders: "18 Orders",
    spent: "$4,432",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsJ8WQ-JdJe4Fd5nTP7ZE3pkATfnH-fYRF9B9gsF3F59qVAg9uSCuf_RV9u0po8eVXid_86DDb_2UMxj0qgxPszXl2RlruoGkgzuPYVPPTLkD3kDBhQIi0zhNM_v-HymW-rUTZXAEizF9DlFzWip91JZAHalGYXW2kUZIsBe2229LoO9hLgLpdeLD86cP2uWIurBCRgGduO3Sr2XiyTCul1KdPQbPkgb3n7KoMqVpuaDnC912ltA2q"
  },
  {
    id: 2,
    name: "Cameron Williamson",
    orders: "15 Orders",
    spent: "$3,921",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1BbRGVXa7r1E9a2bsaYI0XR8sBzYoq4XEaQQ79v3pGaxYpTaHoYbuLyc9gEqNYkDhKge7G-I7OeBkjPc6r0jiC-1QNTFehwj4Ahc_BqGb-VPq7Er0YoK6Y5WDluedHCJvuh34m9dYgSttKKjFSqCURCIESxqv5QDjqJBROhhf0MlZQaGypwZLP18nIS9DMbxejBHbrRHeo11jxyyVb6h7lhXQMf3_FnnTXDw21kb7VfnJ5QkMYDlq"
  },
  {
    id: 3,
    name: "Brooklyn Simmons",
    orders: "12 Orders",
    spent: "$3,421",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmvvA_15RHl0VQXOHf8mQX2UNDSJSaSUFZjgfnZ5Tl52STm5K_dOcqG5j7UYb25BfSi_5y5zUZiF1RtsNQUhXieQw87V4WC1R2VIhna6E6iF8kwSk6ftJOYKKhIi2nMv1Qc-GkGmI8pfPXtUT4BRoPSHz0Dd1eZwRsKURG7VkIWdSPBNE8LllWvjgSXMi9ksUvUsawytrFkT4lPqf7l-4GPNPtNBMDlp2uwokLjIBpYtFFxkpJM06N"
  }
];

const salesByRegion = {
  regions: [
    { name: "North America", percentage: 42 },
    { name: "Europe", percentage: 28 },
    { name: "Asia", percentage: 20 },
    { name: "Other", percentage: 10 }
  ]
};

const adminUser = {
    name: "John Doe",
    role: "Admin",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxW1e4piI1NbPg71iN7dTD6OL9e3BPWdx5Q4m4LTskBTyZYNktHWCBL982Uag8zHNfaAdn6Fx7t9NI3kwiBzP01La0sLiAYl3HuZRmcV5IxFroTBfLlWloZaHVJl5q-6XykKoAhqQj-6SVSqVWCjo8czCxGUUuuHhBf6ImIge-BSXwVzOs2rGEoo3XTr6ZNZUVJYoaxpjC3YCRnWnsJj9N9OrCLzvjydKmmzghYiw4u_SsCpSXhdME"
}

const productsData = {
  kpis: {
    totalProducts: { value: 1248, formatted: "1,248" },
    activeListings: { value: 1102, formatted: "1,102" },
    lowStock: { value: 14, formatted: "14" },
    outOfStock: { value: 5, formatted: "5" }
  },
  performance: {
    categories: [
      { name: "Electronics", height: "85%" },
      { name: "Fashion", height: "60%" },
      { name: "Home", height: "45%" },
      { name: "Beauty", height: "30%" },
      { name: "Sports", height: "70%" }
    ]
  },
  distribution: {
    totalItems: "1,248",
    categories: [
      { name: "Electronics", percentage: "40%" },
      { name: "Fashion", percentage: "30%" },
      { name: "Home", percentage: "20%" },
      { name: "Other", percentage: "10%" }
    ]
  },
  inventory: [
    { name: "Wireless Headphones", sku: "SKU-ELE-001", category: "Electronics", stock: "145", price: "$129.99", status: "In Stock" },
    { name: "Smart Watch Series 8", sku: "SKU-ELE-002", category: "Electronics", stock: "89", price: "$399.99", status: "In Stock" },
    { name: "Leather Backpack", sku: "SKU-FAS-001", category: "Fashion", stock: "12", price: "$89.99", status: "Low Stock" },
    { name: "Running Shoes", sku: "SKU-SPO-001", category: "Sports", stock: "0", price: "$119.99", status: "Out of Stock" }
  ]
};

module.exports = {
  kpis,
  salesOverview,
  salesByCategory,
  topProducts,
  topCustomers,
  salesByRegion,
  adminUser,
  productsData
};
