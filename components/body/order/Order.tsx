// Order.tsx
"use client"
import React, { useEffect } from 'react';
import { useCheckout } from '../chack/CheckoutContext';

const Order: React.FC = () => {
  const { state, dispatch } = useCheckout();


  useEffect(() => {
    const { price, loadingUnloading, forwarding, serviceCommission, alternativePrice, alternativePriceActive, costPerKm } = state.orderSummary;
    const { distanceKm } = state;

    let calculatedTotal = price + loadingUnloading + serviceCommission;

    if (state.cargoDetails.forwardingService) {
      calculatedTotal += forwarding;
    }

    calculatedTotal += distanceKm * costPerKm;

    if (alternativePriceActive && typeof alternativePrice === 'number' && alternativePrice > 0) {
      calculatedTotal = alternativePrice;
    }

    dispatch({ type: 'UPDATE_ORDER_SUMMARY', payload: { totalPrice: calculatedTotal } });
  }, [
    state.orderSummary.price,
    state.orderSummary.loadingUnloading,
    state.orderSummary.forwarding,
    state.orderSummary.serviceCommission,
    state.orderSummary.alternativePrice,
    state.orderSummary.alternativePriceActive,
    state.orderSummary.costPerKm,
    state.cargoDetails.forwardingService,
    state.distanceKm,
    dispatch
  ]);

  const handleAlternativePriceToggle = () => {
    dispatch({ type: 'UPDATE_ORDER_SUMMARY', payload: { alternativePriceActive: !state.orderSummary.alternativePriceActive } });
  };

  const handleAlternativePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch({ type: 'UPDATE_ORDER_SUMMARY', payload: { alternativePrice: isNaN(value) ? '' : value } });
  };

  const handleOrderClick = () => {
    const { routePoints, cargoDetails, contactInfo } = state;
    const requiredRoutePointsFilled = routePoints.every(point => point.name && point.time);
    const requiredCargoDetailsFilled = cargoDetails.date && cargoDetails.time && cargoDetails.type;
    const requiredContactInfoFilled = contactInfo.fullName && contactInfo.email && contactInfo.phoneNumber;

    if (requiredRoutePointsFilled && requiredCargoDetailsFilled && requiredContactInfoFilled) {
      console.log('Order Submitted:', state);
      alert('Заказ успешно отправлен! Данные в консоли.');
    } else {
      alert('Пожалуйста, заполните все обязательные поля.');
    }
  };

  const isOrderButtonActive = () => {
    const { routePoints, cargoDetails, contactInfo } = state;
    const requiredRoutePointsFilled = routePoints.every(point => point.name && point.time);
    const requiredCargoDetailsFilled = cargoDetails.date && cargoDetails.time && cargoDetails.type;
    const requiredContactInfoFilled = contactInfo.fullName && contactInfo.email && contactInfo.phoneNumber;
    return requiredRoutePointsFilled && requiredCargoDetailsFilled && requiredContactInfoFilled;
  };

  return (
    <div className="w-full md:w-96 p-6 bg-white rounded-lg shadow-md font-inter">
      <div className="flex items-center mb-6">
        <span className="text-orange-500 text-lg font-medium mr-2">Order</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>

      <div className="flex items-start mb-6 border-b pb-6 border-gray-200">
        <img src={state.orderSummary.image} alt="Cargo" className="w-24 h-24 rounded-md object-cover mr-4" />
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Ecological cleaning and maintenance services for home</h4>
          <p className="text-lg font-bold text-orange-500 mb-2">{state.orderSummary.price} THB</p>
          <div className="flex items-center text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{state.routePoints[0]?.name || 'Thailand, Phuket, Rat Burana'}</span>
          </div>
        </div>
      </div>

      <div className="mb-6 border-b pb-6 border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">Point A</p>
        <p className="text-gray-900 mb-4">{state.routePoints[0]?.name || 'Thailand, Phuket, Rat Burana'}, {state.routePoints[0]?.time || '10:00 PM'}</p>
        <p className="text-sm font-medium text-gray-700 mb-2">Point B</p>
        <p className="text-gray-900">{state.routePoints[1]?.name || 'Thailand, Phuket, Rat Burana'}, {state.routePoints[1]?.time || '21:00 PM'}</p>
        {state.distanceKm > 0 && (
          <p className="text-sm font-medium text-gray-700 mt-2">Distance: <span className="text-gray-900">{state.distanceKm} km</span></p>
        )}
      </div>

      <div className="mb-6 border-b pb-6 border-gray-200">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-700">Loading and unloading route</span>
          <span className="text-gray-900">{state.orderSummary.loadingUnloading} THB</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-700">Forwarding services</span>
          <span className="text-gray-900">{state.cargoDetails.forwardingService ? state.orderSummary.forwarding : 0} THB</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-700">Payment</span>
          <span className="text-gray-900">{state.orderSummary.price} THB</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-700">Distance cost ({state.orderSummary.costPerKm} THB/km)</span>
          <span className="text-gray-900">{state.distanceKm * state.orderSummary.costPerKm} THB</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-700">Service commission</span>
          <span className="text-gray-900">{state.orderSummary.serviceCommission} THB</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-orange-500">
          <span>Total price</span>
          <span>{state.orderSummary.totalPrice} THB</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="alternative-price-toggle" className="text-sm font-medium text-gray-700">
            Alternative price
          </label>
          <label htmlFor="alternative-price-toggle" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="alternative-price-toggle"
              className="sr-only peer"
              checked={state.orderSummary.alternativePriceActive}
              onChange={handleAlternativePriceToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        {state.orderSummary.alternativePriceActive && (
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Set your price for this service or product and find the best deal for your budget."
            value={state.orderSummary.alternativePrice}
            onChange={handleAlternativePriceChange}
          />
        )}
      </div>

      <button
        onClick={handleOrderClick}
        disabled={!isOrderButtonActive()}
        className={`w-full py-3 rounded-md text-white font-semibold transition-colors
          ${isOrderButtonActive() ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        Order
      </button>
    </div>
  );
};

export default Order;
