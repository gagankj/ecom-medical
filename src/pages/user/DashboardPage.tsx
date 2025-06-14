import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, Download, RotateCcw, User, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/useToast';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { ORDER_STATUSES } from '../../utils/constants';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserOrders } = useOrders();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  const userOrders = currentUser ? getUserOrders(currentUser.id) : [];

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addToCart(item.product, item.quantity);
    });
    addToast('success', 'Items Added', 'All items from this order have been added to your cart');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'processing':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">Please log in to view your dashboard.</p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-2">Manage your orders and account information</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{userOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {userOrders.filter(order => order.status === 'pending' || order.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">
                {userOrders.filter(order => order.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(userOrders.reduce((sum, order) => sum + order.finalAmount, 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile Information
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'orders' ? (
            <div>
              {userOrders.length > 0 ? (
                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {formatDateTime(order.orderDate)}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]?.color}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-2">{ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]?.label}</span>
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            {formatCurrency(order.finalAmount)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {order.items.slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.product.name}
                              </p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="flex items-center justify-center text-sm text-gray-500">
                            +{order.items.length - 4} more items
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to={`/track-order?orderId=${order.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                        >
                          Track Order
                        </Link>
                        <button
                          onClick={() => handleReorder(order)}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reorder
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center">
                          <Download className="w-4 h-4 mr-2" />
                          Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                  <Link
                    to="/products"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{currentUser.name}</h2>
                    <p className="text-gray-600">{currentUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span> {currentUser.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span> {currentUser.phone}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Member since:</span> {formatDateTime(currentUser.registrationDate)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Address
                    </h3>
                    <div className="text-gray-600">
                      <p>{currentUser.address.street}</p>
                      <p>
                        {currentUser.address.city}, {currentUser.address.state} {currentUser.address.zipCode}
                      </p>
                      <p>{currentUser.address.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;