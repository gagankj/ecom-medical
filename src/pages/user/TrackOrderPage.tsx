import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { formatDateTime } from '../../utils/formatters';
import { ORDER_STATUSES } from '../../utils/constants';

const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const { getOrderById } = useOrders();

  const handleSearch = () => {
    if (!orderId.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const order = getOrderById(orderId.trim());
      setSearchedOrder(order);
      setIsSearching(false);
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'processing':
        return 50;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
        <p className="text-gray-600">Enter your order ID to track the status of your shipment</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID (e.g., ORD-2024-001)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={isSearching || !orderId.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Search className="w-4 h-4 mr-2" />
              {isSearching ? 'Searching...' : 'Track Order'}
            </button>
          </div>
        </div>
      </div>

      {/* Order Results */}
      {searchedOrder ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Order Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order {searchedOrder.id}</h2>
                <p className="text-gray-600 mt-1">
                  Placed on {formatDateTime(searchedOrder.orderDate)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUSES[searchedOrder.status as keyof typeof ORDER_STATUSES]?.color}`}>
                  {getStatusIcon(searchedOrder.status)}
                  <span className="ml-2">{ORDER_STATUSES[searchedOrder.status as keyof typeof ORDER_STATUSES]?.label}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Order Progress</span>
              <span className="text-sm text-gray-600">{getStatusProgress(searchedOrder.status)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getStatusProgress(searchedOrder.status)}%` }}
              />
            </div>
          </div>

          {/* Status Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Updates</h3>
            <div className="space-y-4">
              {searchedOrder.trackingUpdates.map((update: any, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getStatusIcon(update.status)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{update.description}</p>
                    <p className="text-sm text-gray-600">{formatDateTime(update.timestamp)}</p>
                    {update.location && (
                      <p className="text-sm text-gray-500">Location: {update.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {searchedOrder.items.map((item: any) => (
                <div key={item.product.id} className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Address</h3>
            <div className="text-gray-600">
              <p>{searchedOrder.shippingAddress.street}</p>
              <p>
                {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.zipCode}
              </p>
              <p>{searchedOrder.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      ) : orderId && !isSearching ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-gray-400 mb-4">
            <Package className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Order Not Found</h3>
          <p className="text-gray-600">
            We couldn't find an order with ID "{orderId}". Please check your order ID and try again.
          </p>
        </div>
      ) : null}

      {/* Demo Orders */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Order IDs</h3>
        <p className="text-gray-600 mb-4">Try tracking these sample orders:</p>
        <div className="flex flex-wrap gap-2">
          {['ORD-2024-001', 'ORD-2024-002', 'ORD-2024-003'].map((id) => (
            <button
              key={id}
              onClick={() => setOrderId(id)}
              className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;