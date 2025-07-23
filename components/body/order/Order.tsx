"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCheckout } from '../chack/CheckoutContext';
import ImageUploadModal from './ImageUploadModal';

const Order: React.FC = () => {
  const { state, dispatch } = useCheckout();
  const [isImageUploadModalOpen, setIsImageUploadModalOpen] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(state.orderSummary.description);

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

  useEffect(() => {
    setEditedDescription(state.orderSummary.description);
  }, [state.orderSummary.description]);

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
      alert('Order successfully submitted! Details in console.');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const isOrderButtonActive = () => {
    const { routePoints, cargoDetails, contactInfo } = state;
    const requiredRoutePointsFilled = routePoints.every(point => point.name && point.time);
    const requiredCargoDetailsFilled = cargoDetails.date && cargoDetails.time && cargoDetails.type;
    const requiredContactInfoFilled = contactInfo.fullName && contactInfo.email && contactInfo.phoneNumber;
    return requiredRoutePointsFilled && requiredCargoDetailsFilled && requiredContactInfoFilled;
  };

  const handleImageUpload = (imageData: { src: string; name: string; type: string; size: number }) => {
    dispatch({ type: 'UPDATE_ORDER_SUMMARY', payload: { image: imageData } });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    dispatch({ type: 'UPDATE_ORDER_SUMMARY', payload: { description: editedDescription } });
    setIsEditingDescription(false);
  };

  const handleCancelDescriptionEdit = () => {
    setEditedDescription(state.orderSummary.description);
    setIsEditingDescription(false);
  };

  return (
    <div className="w-full md:w-96 p-6 bg-white rounded-lg shadow-md font-inter">
      <div className="flex items-center mb-6">
        <Image src="/vector.svg" alt="vector" width={9} height={16}/>
        <span className="text-lg font-semibold pl-2 mr-2">Order</span>
      </div>
      <div className='border p-4 mb-6 border-[#E0E3E4] rounded-[8px]'>
        <div className="flex items-start mb-6">
          <img
            src={state.orderSummary.image ? state.orderSummary.image.src : 'https://placehold.co/100x70/E0F2FE/000000?text=Cargo'}
            alt="Cargo"
            className="w-24 h-24 rounded-md object-cover mr-4"
          />
          <div className="flex-1">
            {isEditingDescription ? (
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[60px] text-gray-900"
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
            ) : (
              <h4 className="font-semibold text-gray-900 mb-1">{state.orderSummary.description}</h4>
            )}
            <p className="text-lg font-bold text-orange-500 mb-2">{state.orderSummary.price} THB</p>
            <div className="flex justify-between max-w-[157px] h-[22px] w-full items-center text-gray-500 text-sm">
              <div className='flex items-center'>
                <Image src="/location.svg" alt="loacation" width={17} height={22}/>
                <span className='pl-1'>{state.routePoints[0]?.name || 'Thailand, Phuket, Rat Burana'}</span>
              </div>
              <Image src="/dote.svg" alt="dote" width={5} height={20}/>
              <div className='flex items-center justify-between w-[39px] h-[17px] font-semibold'>
                <Image src="/lighting.svg" alt="lighting" width={13} height={18}/>
                <span>5,0</span>
              </div>
            </div>
            {isEditingDescription ? (
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={handleCancelDescriptionEdit}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDescription}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingDescription(true)}
                className="mt-2 text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm"
              >
                Edit Description
              </button>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsImageUploadModalOpen(true)}
          className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upload Image
        </button>

        <div className="p-3 border border-[#D128A166] rounded-[8px] mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Point A</p>
          <p className="text-pink-600 font-semibold mb-4">{state.routePoints[0]?.name || 'Thailand, Phuket, Rat Burana'}, {state.routePoints[0]?.time || '10:00 PM'}</p>
          <p className="text-sm font-medium text-gray-700 mb-2">Point B</p>
          <p className="text-pink-600 font-semibold">{state.routePoints[1]?.name || 'Thailand, Phuket, Rat Burana'}, {state.routePoints[1]?.time || '21:00 PM'}</p>
        </div>
      </div>

      <div className="mb-6 pb-1">
        <div className='border-b border-[#F6F3F7]'>
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
          <div className="flex justify-between mb-4">
            <span className="text-sm text-gray-700">Service commission</span>
            <span className="text-gray-900">{state.orderSummary.serviceCommission} THB</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-lg text-orange-500">
          <span>Total price</span>
          <span>{state.orderSummary.totalPrice} THB</span>
        </div>
      </div>

      <div className="mb-6 border border-[#F6F3F7] rounded-[5px] p-2">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="alternative-price-toggle"
            className="h-4 w-4 rounded-b-2xl text-blue-600 border-gray-300 focus:ring-blue-500"
            checked={state.orderSummary.alternativePriceActive}
            onChange={handleAlternativePriceToggle}
          />
          <label htmlFor="alternative-price-toggle" className="text-sm pl-2 font-semibold text-gray-700">
            Alternative price
          </label>
        </div>
        <p className='text-[#9DA6AA]'>Set your price for a service or product and find the best deal for your budget.</p>
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
      <ImageUploadModal
        isOpen={isImageUploadModalOpen}
        onClose={() => setIsImageUploadModalOpen(false)}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

export default Order;