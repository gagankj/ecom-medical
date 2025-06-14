import React, { useState } from 'react';
import { Search, Eye, Mail, Phone, MapPin } from 'lucide-react';
import { users } from '../../data/users';
import { useOrders } from '../../context/OrderContext';
import { formatDateTime, formatCurrency } from '../../utils/formatters';

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { getUserOrders } = useOrders();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewUser = (user: any) => {
    const userOrders = getUserOrders(user.id);
    setSelectedUser({ ...user, orders: userOrders });
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-2">Manage registered users and their information</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const userOrders = getUserOrders(user.id);
                const totalSpent = userOrders.reduce((sum, order) => sum + order.finalAmount, 0);
                
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone}</div>
                      <div className="text-sm text-gray-500">
                        {user.address.city}, {user.address.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(user.registrationDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {userOrders.length} orders
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(totalSpent)} total
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                  <p className="text-gray-600">{selectedUser.name}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedUser.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedUser.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedUser.phone}</p>
                    <p><span className="font-medium">Registered:</span> {formatDateTime(selectedUser.registrationDate)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Address
                  </h3>
                  <div className="text-gray-600">
                    <p>{selectedUser.address.street}</p>
                    <p>
                      {selectedUser.address.city}, {selectedUser.address.state} {selectedUser.address.zipCode}
                    </p>
                    <p>{selectedUser.address.country}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Order History</h3>
                {selectedUser.orders.length > 0 ? (
                  <div className="space-y-3">
                    {selectedUser.orders.map((order: any) => (
                      <div key={order.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{order.id}</h4>
                            <p className="text-sm text-gray-600">{formatDateTime(order.orderDate)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{formatCurrency(order.finalAmount)}</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No orders found</p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{selectedUser.orders.length}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(selectedUser.orders.reduce((sum: number, order: any) => sum + order.finalAmount, 0))}
                    </p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedUser.orders.filter((order: any) => order.status === 'delivered').length}
                    </p>
                    <p className="text-sm text-gray-600">Completed Orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;