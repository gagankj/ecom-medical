import React from 'react';
import { ShoppingCart, Star, Package } from 'lucide-react';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/useToast';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) {
      addToast('error', 'Out of Stock', 'This product is currently out of stock');
      return;
    }
    
    addToCart(product);
    addToast('success', 'Added to Cart', `${product.name} has been added to your cart`);
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {product.inStock ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${product.inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;