import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useToast } from '../../hooks/useToast';
import { formatCurrency } from '../../utils/formatters';
import { generateOrderId } from '../../utils/formatters';
import { TAX_RATE, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../../utils/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { addOrder } = useOrders();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'pay-later'>('credit-card');
  const [shippingAddress, setShippingAddress] = useState({
    street: currentUser?.address.street || '',
    city: currentUser?.address.city || '',
    state: currentUser?.address.state || '',
    zipCode: currentUser?.address.zipCode || '',
    country: currentUser?.address.country || 'USA'
  });

  const tax = total * TAX_RATE;
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = total + tax + shipping;

  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      addToast('error', 'Authentication Required', 'Please log in to place an order');
      return;
    }

    if (items.length === 0) {
      addToast('error', 'Empty Cart', 'Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderId = generateOrderId();
      const newOrder = {
        id: orderId,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        items: [...items],
        totalAmount: total,
        tax,
        shippingCost: shipping,
        finalAmount: finalTotal,
        status: 'pending' as const,
        paymentStatus: paymentMethod === 'credit-card' ? 'paid' as const : 'pending' as const,
        paymentMethod: paymentMethod === 'credit-card' ? 'Credit Card' : 'Pay Later',
        shippingAddress,
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        trackingUpdates: [
          {
            status: 'pending' as const,
            description: 'Order received and being processed',
            timestamp: new Date().toISOString()
          }
        ]
      };

      addOrder(newOrder);
      clearCart();
      
      addToast('success', 'Order Placed', 'Your order has been placed successfully!');
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      addToast('error', 'Order Failed', 'There was an error processing your order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Truck className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={shippingAddress.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'credit-card')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Credit Card (Dummy Payment)</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="pay-later"
                  checked={paymentMethod === 'pay-later'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'pay-later')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Pay Later</span>
              </label>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  This is a demo payment system. No real charges will be made.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Pricing */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(total)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                </span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Processing Order...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;