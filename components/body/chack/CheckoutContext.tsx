// CheckoutContext.tsx
"use client"
import React, { createContext, useReducer, useContext, useEffect, ReactNode, Dispatch } from 'react';

export interface RoutePoint {
  id: string;
  name: string;
  time: string;
}

export interface CargoDetails {
  date: string;
  time: string;
  type: string;
  dimensions: {
    length: number | '';
    width: number | '';
    height: number | '';
    unit: string;
  };
  forwardingService: boolean;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface CheckoutState {
  routePoints: RoutePoint[];
  cargoDetails: CargoDetails;
  comment: string;
  contactInfo: ContactInfo;
  orderSummary: {
    image: string;
    price: number;
    route: string;
    loadingUnloading: number;
    forwarding: number;
    serviceCommission: number;
    totalPrice: number;
    alternativePrice: number | '';
    alternativePriceActive: boolean;
    costPerKm: number;
  };
  distanceKm: number;
}

export type Action =
  | { type: 'ADD_ROUTE_POINT'; payload: RoutePoint }
  | { type: 'UPDATE_ROUTE_POINT'; payload: { id: string; field: keyof RoutePoint; value: string } }
  | { type: 'REMOVE_ROUTE_POINT'; payload: string }
  | { type: 'UPDATE_CARGO_DETAILS'; payload: Partial<CargoDetails> }
  | { type: 'UPDATE_COMMENT'; payload: string }
  | { type: 'UPDATE_CONTACT_INFO'; payload: Partial<ContactInfo> }
  | { type: 'UPDATE_ORDER_SUMMARY'; payload: Partial<CheckoutState['orderSummary']> }
  | { type: 'UPDATE_DISTANCE'; payload: number }
  | { type: 'SET_INITIAL_STATE'; payload: CheckoutState };

export const initialState: CheckoutState = {
  routePoints: [
    { id: 'A', name: '', time: '' },
    { id: 'B', name: '', time: '' },
  ],
  cargoDetails: {
    date: '',
    time: '',
    type: '',
    dimensions: { length: '', width: '', height: '', unit: 'cm' },
    forwardingService: false,
  },
  comment: '',
  contactInfo: {
    fullName: 'Marvin McKinney',
    email: 'example@mail.com',
    phoneNumber: '+66123456789',
  },
  orderSummary: {
    image: 'https://placehold.co/100x70/E0F2FE/000000?text=Cargo',
    price: 0,
    route: '___',
    loadingUnloading: 0,
    forwarding: 0,
    serviceCommission: 0,
    totalPrice: 0,
    alternativePrice: '',
    alternativePriceActive: false,
    costPerKm: 0,
  },
  distanceKm: 0,
};



export const checkoutReducer = (state: CheckoutState, action: Action): CheckoutState => {
  switch (action.type) {
    case 'ADD_ROUTE_POINT':
      return { ...state, routePoints: [...state.routePoints, action.payload] };
    case 'UPDATE_ROUTE_POINT':
      return {
        ...state,
        routePoints: state.routePoints.map((point) =>
          point.id === action.payload.id ? { ...point, [action.payload.field]: action.payload.value } : point
        ),
      };
    case 'REMOVE_ROUTE_POINT':
      return {
        ...state,
        routePoints: state.routePoints.filter((point) => point.id !== action.payload),
      };
    case 'UPDATE_CARGO_DETAILS':
      return { ...state, cargoDetails: { ...state.cargoDetails, ...action.payload } };
    case 'UPDATE_COMMENT':
      return { ...state, comment: action.payload };
    case 'UPDATE_CONTACT_INFO':
      return { ...state, contactInfo: { ...state.contactInfo, ...action.payload } };
    case 'UPDATE_ORDER_SUMMARY':
      return { ...state, orderSummary: { ...state.orderSummary, ...action.payload } };
    case 'UPDATE_DISTANCE':
      return { ...state, distanceKm: action.payload };
    case 'SET_INITIAL_STATE':
      return {
        ...initialState,
        ...action.payload,
        orderSummary: {
          ...initialState.orderSummary,
          ...action.payload.orderSummary,
        },
        routePoints: action.payload.routePoints || initialState.routePoints,
      };
    default:
      return state;
  }
};


export const CheckoutContext = createContext<{
  state: CheckoutState;
  dispatch: Dispatch<Action>;
} | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('checkoutState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'SET_INITIAL_STATE', payload: parsedState });
      } catch (e) {
        console.error("Failed to parse state from localStorage", e);
        localStorage.removeItem('checkoutState');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkoutState', JSON.stringify(state));
  }, [state]);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};
