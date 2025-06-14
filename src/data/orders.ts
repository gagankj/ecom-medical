import { Order, OrderStatus, PaymentStatus } from '../types';
import { products } from './products';

export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 'user-001',
    userName: 'Dr. Sarah Johnson',
    userEmail: 'sarah.johnson@cityhospital.com',
    items: [
      { product: products[0], quantity: 2 },
      { product: products[3], quantity: 5 }
    ],
    totalAmount: 829.93,
    tax: 66.39,
    shippingCost: 25.00,
    finalAmount: 921.32,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: '123 Medical Center Drive',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    orderDate: '2024-01-15T10:30:00Z',
    estimatedDelivery: '2024-01-18T17:00:00Z',
    trackingUpdates: [
      {
        status: 'pending',
        description: 'Order received and being processed',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        status: 'processing',
        description: 'Items picked and packaged',
        timestamp: '2024-01-15T14:20:00Z'
      },
      {
        status: 'shipped',
        description: 'Package shipped via FedEx',
        timestamp: '2024-01-16T09:15:00Z',
        location: 'New York Distribution Center'
      },
      {
        status: 'delivered',
        description: 'Package delivered successfully',
        timestamp: '2024-01-18T16:45:00Z',
        location: 'Medical Center Drive, New York'
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    userId: 'user-002',
    userName: 'Michael Chen',
    userEmail: 'mchen@bloodbank.org',
    items: [
      { product: products[1], quantity: 3 },
      { product: products[2], quantity: 1 }
    ],
    totalAmount: 949.96,
    tax: 75.99,
    shippingCost: 30.00,
    finalAmount: 1055.95,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Purchase Order',
    shippingAddress: {
      street: '456 Healthcare Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    orderDate: '2024-01-20T14:15:00Z',
    estimatedDelivery: '2024-01-24T17:00:00Z',
    trackingUpdates: [
      {
        status: 'pending',
        description: 'Order received and being processed',
        timestamp: '2024-01-20T14:15:00Z'
      },
      {
        status: 'processing',
        description: 'Items picked and packaged',
        timestamp: '2024-01-20T16:30:00Z'
      },
      {
        status: 'shipped',
        description: 'Package shipped via UPS',
        timestamp: '2024-01-21T11:00:00Z',
        location: 'Los Angeles Distribution Center'
      }
    ]
  },
  {
    id: 'ORD-2024-003',
    userId: 'user-003',
    userName: 'Dr. Emily Rodriguez',
    userEmail: 'emily.rodriguez@metrohealth.com',
    items: [
      { product: products[5], quantity: 1 }
    ],
    totalAmount: 449.99,
    tax: 36.00,
    shippingCost: 15.00,
    finalAmount: 500.99,
    status: 'processing',
    paymentStatus: 'pending',
    paymentMethod: 'Pay Later',
    shippingAddress: {
      street: '789 Medical Plaza',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    orderDate: '2024-01-22T09:45:00Z',
    estimatedDelivery: '2024-01-26T17:00:00Z',
    trackingUpdates: [
      {
        status: 'pending',
        description: 'Order received and being processed',
        timestamp: '2024-01-22T09:45:00Z'
      },
      {
        status: 'processing',
        description: 'Items being picked and packaged',
        timestamp: '2024-01-22T12:00:00Z'
      }
    ]
  }
];