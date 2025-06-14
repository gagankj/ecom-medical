import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Package, Truck, Calendar } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  
  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    // Create a simple HTML invoice and trigger download
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .invoice-details { margin-bottom: 30px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .items-table th { background-color: #f5f5f5; }
            .totals { text-align: right; }
            .total-row { font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SDP Kits</h1>
            <h2>Invoice</h2>
          </div>
          
          <div class="invoice-details">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${formatDateTime(order.orderDate)}</p>
            <p><strong>Customer:</strong> ${order.userName}</p>
            <p><strong>Email:</strong> ${order.userEmail}</p>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.product.name}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.product.price)}</td>
                  <td>${formatCurrency(item.product.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="totals">
            <p>Subtotal: ${formatCurrency(order.totalAmount)}</p>
            <p>Tax: ${formatCurrency(order.tax)}</p>
            <p>Shipping: ${formatCurrency(order.shippingCost)}</p>
            <p class="total-row">Total: ${formatCurrency(order.finalAmount)}</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your order. We'll send you updates as it progresses.</p>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Order ID</h3>
            <p className="text-gray-600">{order.id}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Order Date</h3>
            <p className="text-gray-600">{formatDateTime(order.orderDate)}</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Estimated Delivery</h3>
            <p className="text-gray-600">{formatDateTime(order.estimatedDelivery)}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
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
                <span className="font-medium text-gray-900">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">{formatCurrency(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
            <span>Total</span>
            <span>{formatCurrency(order.finalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownloadInvoice}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Invoice
        </button>
        
        <Link
          to={`/track-order?orderId=${order.id}`}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
        >
          Track Order
        </Link>
        
        <Link
          to="/products"
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;