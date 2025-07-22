// MainLayout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Chack from './chack/Chack';
import Order from './order/Order';
import { useCheckout } from './chack/CheckoutContext';

const MainLayout: React.FC = () => {
  const { state } = useCheckout();
  const [isMobile, setIsMobile] = useState(false);
  const [showOrderOnMobile, setShowOrderOnMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const isChackFormValid = () => {
    const { routePoints, cargoDetails, contactInfo } = state;
    const requiredRoutePointsFilled = routePoints.every(point => point.name && point.time);
    const requiredCargoDetailsFilled = cargoDetails.date && cargoDetails.time && cargoDetails.type;
    const requiredContactInfoFilled = contactInfo.fullName && contactInfo.email && contactInfo.phoneNumber;
    return requiredRoutePointsFilled && requiredCargoDetailsFilled && requiredContactInfoFilled;
  };

  const handleContinueClick = () => {
    if (isChackFormValid()) {
      setShowOrderOnMobile(true);
    } else {
      alert('Пожалуйста, заполните все обязательные поля в разделе "Checkout".');
    }
  };

  const handleBackToChack = () => {
    setShowOrderOnMobile(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {isMobile ? (
        <>
          {!showOrderOnMobile ? (
            <div className="w-full max-w-lg">
              <Chack />
              <button
                onClick={handleContinueClick}
                disabled={!isChackFormValid()}
                className={`w-full py-3 mt-6 rounded-md text-white font-semibold transition-colors
                  ${isChackFormValid() ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="w-full max-w-lg">
              <button
                onClick={handleBackToChack}
                className="mb-4 text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Checkout
              </button>
              <Order />
            </div>
          )}
        </>
      ) : (

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
          <Chack />
          <Order />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
