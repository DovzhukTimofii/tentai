// Chack.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { useCheckout, RoutePoint, CargoDetails, ContactInfo } from './CheckoutContext';
import ContactInfoFormModal from './ContactInfoFormModal';
import Image from 'next/image';

interface DistanceElement {
  status: string;
  distance?: {
    value: number;
    text: string;
  };
  duration?: {
    value: number;
    text: string;
  };
}

interface DistanceRow {
  elements: DistanceElement[];
}

interface DistanceMatrixResponse {
  status: string;
  origin_addresses: string[];
  destination_addresses: string[];
  rows: DistanceRow[];
  error_message?: string;
}

const getDistanceViaGoogleMaps = async (routePoints: RoutePoint[]): Promise<number> => {
  const validRoutePoints = routePoints.filter(p => p.name.trim() !== '');

  if (validRoutePoints.length < 2) return 0;

  const origins = validRoutePoints.slice(0, -1).map(p => p.name).join('|');
  const destinations = validRoutePoints.slice(1).map(p => p.name).join('|');

  const internalApiUrl = `/api/distance?origins=${origins}&destinations=${destinations}`;

  try {
    const response = await fetch(internalApiUrl);
    const data: DistanceMatrixResponse = await response.json();

    if (response.ok && data.status === 'OK' && data.rows.length > 0) {
      let totalDistanceMeters = 0;
      let hasZeroResults = false;

      data.rows.forEach((row) => {
        row.elements.forEach((element) => {
          if (element.status === 'OK' && element.distance) {
            totalDistanceMeters += element.distance.value;
          } else if (element.status === 'ZERO_RESULTS' || element.status === 'NOT_FOUND') {
            hasZeroResults = true;
          }
        });
      });

      if (hasZeroResults) {
        console.warn("Google Maps API returned ZERO_RESULTS or NOT_FOUND for some segments. Distance set to 0.");
        return 0;
      }

      return totalDistanceMeters / 1000;
    } else {
      console.error("Error from internal API or Google Maps API:", data.error_message || data.status || "Unknown error occurred during distance calculation.");
      return 0;
    }
  } catch (error) {
    console.error("Error fetching distance via internal API:", error);
    return 0;
  }
};

const Chack: React.FC = () => {
  const { state, dispatch } = useCheckout();
  const [commentCharCount, setCommentCharCount] = useState(state.comment.length);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const calculateDistance = async () => {
      setIsCalculatingDistance(true);
      setDistanceError(null);
      const distance = await getDistanceViaGoogleMaps(state.routePoints);
      if (distance === 0 && state.routePoints.filter(p => p.name.trim() !== '').length >= 2) {
        setDistanceError("Can't find city, try another city.");
      }
      dispatch({ type: 'UPDATE_DISTANCE', payload: distance });
      setIsCalculatingDistance(false);
    };

    if (state.routePoints.filter(p => p.name.trim() !== '').length >= 2) {
      calculateDistance();
    } else {
      dispatch({ type: 'UPDATE_DISTANCE', payload: 0 });
      setDistanceError(null);
    }
  }, [state.routePoints, dispatch]);


  const handleAddPoint = () => {
    const newPointId = String.fromCharCode(65 + state.routePoints.length);
    dispatch({ type: 'ADD_ROUTE_POINT', payload: { id: newPointId, name: '', time: '' } });
  };

  const handleRemovePoint = (id: string) => {
    dispatch({ type: 'REMOVE_ROUTE_POINT', payload: id });
  };

  const handleRoutePointChange = (id: string, field: keyof RoutePoint, value: string) => {
    dispatch({ type: 'UPDATE_ROUTE_POINT', payload: { id, field, value } });
  };

  const handleCargoDetailsChange = <K extends keyof CargoDetails>(field: K, value: CargoDetails[K]) => {
    dispatch({ type: 'UPDATE_CARGO_DETAILS', payload: { [field]: value } });
  };

  const handleDimensionChange = (field: keyof CargoDetails['dimensions'], value: number | '') => {
    dispatch({
      type: 'UPDATE_CARGO_DETAILS',
      payload: {
        dimensions: {
          ...state.cargoDetails.dimensions,
          [field]: value,
        },
      },
    });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 4000) {
      dispatch({ type: 'UPDATE_COMMENT', payload: value });
      setCommentCharCount(value.length);
    }
  };

  const handleContactInfoEdit = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-md font-inter">
      <h2 className="text-xl font-semibold mb-6">Checkout</h2>
      <div className="mb-8 mb-2">
        <div className='flex items-center'>
          <Image src="/vector.svg" alt="vector" width={9} height={16}/>
          <h3 className="pl-2 font-semibold">Route</h3>
        </div>
        
        {state.routePoints.map((point) => (
          <div key={point.id} className="mt-2 border border-[#E0E3E4] p-3 rounded-[10px]  mb-4">
            {state.routePoints.length > 2 && point.id !== 'A' && point.id !== 'B' && (
              <div className='flex items-center justify-between mb-2'>
                <span className='font-semibold'>Additional point</span>
                <button
                  onClick={() => handleRemovePoint(point.id)}
                  className="col-span-1 md:col-span-2 text-red-500 text-sm flex items-center justify-end"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
            {point.id === 'A' && (
              <div className='mb-2'>
                <span className='font-semibold'>Download location</span>
              </div>
            )}
            {point.id === 'B' && (
              <div className='mb-2'>
                <span className='font-semibold'>Place of unloading</span>
              </div>
            )}
            <div className='flex items-center justify-between'>
              <div className='w-full pr-3'>
                <label htmlFor={`point-${point.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Point {point.id} <span className="text-red-500">*</span>
                </label>
               <div className='relative'>
                  <input
                    type="text"
                    id={`point-${point.id}`}
                    className="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Thailand, Phuket, Rat Burana..`}
                    value={point.name}
                    onChange={(e) => handleRoutePointChange(point.id, 'name', e.target.value)}
                  />
                  <Image
                    className='absolute right-3 top-1/2 transform -translate-y-1/2'
                    src="/map.svg"
                    alt="map"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className='min-w-[187px]'>
                <label htmlFor={`time-${point.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Operating time (hour) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={`time-${point.id}`}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter hour"
                  value={point.time}
                  onChange={(e) => handleRoutePointChange(point.id, 'time', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddPoint}
          className="pt-2 pb-2 pl-6 pr-6 mt-4 border-2 border-pink-600 bg-white text-pink-600 hover:text-white hover:bg-pink-600 flex items-center  transition-colors font-semibold rounded-[6px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add another point
        </button>
      </div>

      <div className="mb-8">
        <div className='flex items-center pb-2'>
          <Image src="/vector.svg" alt="vector" width={9} height={16}/>
          <h3 className="pl-2 font-semibold">About the cargo</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Date of upload <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date-upload"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={state.cargoDetails.date}
              onChange={(e) => handleCargoDetailsChange('date', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="time-arrival" className="block text-sm font-medium text-gray-700 mb-1">
              Time of arrival <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="time-arrival"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter hour"
              value={state.cargoDetails.time}
              onChange={(e) => handleCargoDetailsChange('time', e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="cargo-weight" className="block text-sm font-medium text-gray-700 mb-1">
            Cargo weight (kg)
          </label>
          <input
            type="number"
            id="cargo-weight"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Placeholder"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type-cargo" className="block text-sm font-medium text-gray-700 mb-1">
            Type of cargo <span className="text-red-500">*</span>
          </label>
          <select
            id="type-cargo"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={state.cargoDetails.type}
            onChange={(e) => handleCargoDetailsChange('type', e.target.value)}
          >
            <option value="">Placeholder</option>
            <option value="fragile">Fragile</option>
            <option value="liquid">Liquid</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cargo size of the LWH (m)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={state.cargoDetails.dimensions.length}
              onChange={(e) => handleDimensionChange('length', parseFloat(e.target.value) || '')}
            />
            <span className="self-center">x</span>
            <input
              type="number"
              className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={state.cargoDetails.dimensions.width}
              onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value) || '')}
            />
            <span className="self-center">x</span>
            <input
              type="number"
              className="w-1/3 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={state.cargoDetails.dimensions.height}
              onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value) || '')}
            />
            <select
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={state.cargoDetails.dimensions.unit}
              onChange={(e) => handleCargoDetailsChange('dimensions', { ...state.cargoDetails.dimensions, unit: e.target.value })}
            >
              <option value="cm">cm</option>
              <option value="m">m</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label htmlFor="forwarding-service" className="text-sm font-medium text-gray-700">
            Forwarding service
          </label>
          <label htmlFor="forwarding-service" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="forwarding-service"
              className="sr-only peer"
              checked={state.cargoDetails.forwardingService}
              onChange={(e) => handleCargoDetailsChange('forwardingService', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <div className='flex items-center pb-2'>
          <Image src="/vector.svg" alt="vector" width={9} height={16}/>
          <h3 className="pl-2 font-semibold">Leave a comment</h3>
        </div>
        <textarea
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[100px]"
          placeholder="Placeholder"
          value={state.comment}
          onChange={handleCommentChange}
        ></textarea>
        <p className="text-right text-sm text-gray-500 mt-1">
          {commentCharCount}/4000
        </p>
      </div>

      <div className="mb-8">
        <div className='flex items-center pb-2'>
          <Image src="/vector.svg" alt="vector" width={9} height={16}/>
          <h3 className="pl-2 font-semibold">Contact information</h3>
        </div>
        <div className=" flex items-start justify-between border rounded-[10px] p-4 border-[#E0E3E4]">
          <div className='sm:min-w-[326px]'>
            <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Full name</span>
            <span className="text-sm text-gray-900">{state.contactInfo.fullName}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <span className="text-sm text-gray-900">{state.contactInfo.email}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Phone number</span>
              <span className="text-sm text-gray-900">{state.contactInfo.phoneNumber}</span>
            </div>
          </div>
          <button
              onClick={handleContactInfoEdit}
              className="
                w-[74px] h-[28px] px-3 py-1 mt-4 sm:mt-0
                border-2 border-pink-600 bg-pink-600 text-white
                hover:text-pink-600 hover:bg-white
                flex items-center justify-center gap-2
                transition-colors font-semibold rounded-[4px]
                shrink-0
              "
            >
              <span>Edit</span>
              <Image className='' src="/edit.svg" alt='edit' width={16} height={16}/>
            </button>
        </div>
      </div>

      <div className="mb-8">
        <div className='flex items-center pb-2'>
          <Image src="/vector.svg" alt="vector" width={9} height={16}/>
          <h3 className="pl-2 font-semibold">Payment</h3>
        </div>
        <div>
          <div className='flex items-center'>
            <Image src="/wallet.svg" alt="wallet" width={24} height={24}/>
            <span className='pl-2'>Payment on receipt</span>
          </div>
          <p className="text-sm text-[#9DA6AA]">
            Avoid online transactions and pay only when you receive your order. This will guarantee your financial security and avoid any risks associated with electronic payments.
          </p>
        </div>
      </div>

      <ContactInfoFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        currentContactInfo={state.contactInfo}
      />
    </div>
  );
};

export default Chack;