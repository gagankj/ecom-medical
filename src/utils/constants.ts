export const TAX_RATE = 0.08; // 8% tax rate
export const SHIPPING_COST = 25.00; // Base shipping cost
export const FREE_SHIPPING_THRESHOLD = 500.00; // Free shipping above this amount

export const ORDER_STATUSES = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' }
};

export const PAYMENT_STATUSES = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  paid: { label: 'Paid', color: 'bg-green-100 text-green-800' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800' }
};

export const PRODUCT_CATEGORIES = [
  'All Categories',
  'SDP Kits',
  'Accessories',
  'Storage Solutions',
  'Testing Kits'
];