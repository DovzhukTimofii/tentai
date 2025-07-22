// Body.tsx
"use client"
import React from 'react';
import { CheckoutProvider } from './chack/CheckoutContext';
import MainLayout from './MainLayout';

const Body = () => {
  return (
    <CheckoutProvider>
      <MainLayout />
    </CheckoutProvider>
  );
};

export default Body;
