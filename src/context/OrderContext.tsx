import React, { createContext, useContext, useState } from 'react';
import { Order, OrderStatus, PaymentStatus } from '../types';
import { orders as initialOrders } from '../data/orders';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status,
            trackingUpdates: [
              ...order.trackingUpdates,
              {
                status,
                description: `Order status updated to ${status}`,
                timestamp: new Date().toISOString()
              }
            ]
          }
        : order
    ));
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: PaymentStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, paymentStatus } : order
    ));
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string) => {
    return orders.filter(order => order.userId === userId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      updatePaymentStatus,
      getOrderById,
      getUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};