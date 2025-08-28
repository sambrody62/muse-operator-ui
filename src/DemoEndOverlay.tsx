import React from 'react';
import { X } from 'lucide-react';

interface DemoEndOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  onLearnMore: () => void;
}

const DemoEndOverlay: React.FC<DemoEndOverlayProps> = ({ isVisible, onClose, onLearnMore }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all animate-slide-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        
        {/* Content */}
        <div className="text-center">
          {/* Icon or Logo */}
          <div className="mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl text-white font-bold">N</span>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Learn how Nucleus works
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">
            Discover how Nucleus AI agents can transform your team's productivity and unlock new possibilities.
          </p>
          
          {/* CTA Button */}
          <button
            onClick={onLearnMore}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Learn More
          </button>
          
          {/* Secondary text */}
          <p className="mt-4 text-sm text-gray-500">
            Click anywhere outside to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoEndOverlay;