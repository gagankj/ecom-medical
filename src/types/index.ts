export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  specifications: string[];
  category: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  registrationDate: string;
  totalOrders: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: CartItem[];
  totalAmount: number;
  tax: number;
  shippingCost: number;
  finalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  orderDate: string;
  estimatedDelivery: string;
  trackingUpdates: TrackingUpdate[];
}

export interface TrackingUpdate {
  status: OrderStatus;
  description: string;
  timestamp: string;
  location?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Analytics {
  totalOrders: number;
  pendingPayments: number;
  totalRevenue: number;
  inStockProducts: number;
  outOfStockProducts: number;
  dailyRevenue: { date: string; revenue: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
  ordersByStatus: { status: string; count: number }[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}