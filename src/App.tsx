import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useToast } from './hooks/useToast';
import { ToastContainer } from './components/common/Toast';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// User Pages
import HomePage from './pages/user/HomePage';
import ProductsPage from './pages/user/ProductsPage';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';
import OrderConfirmationPage from './pages/user/OrderConfirmationPage';
import TrackOrderPage from './pages/user/TrackOrderPage';
import DashboardPage from './pages/user/DashboardPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import InventoryPage from './pages/admin/InventoryPage';
import OrdersPage from './pages/admin/OrdersPage';
import UsersPage from './pages/admin/UsersPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { currentUser, isAdmin } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected User Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="/order-confirmation/:orderId" element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/inventory" element={
            <ProtectedRoute adminOnly>
              <InventoryPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute adminOnly>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute adminOnly>
              <UsersPage />
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <AppContent />
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;