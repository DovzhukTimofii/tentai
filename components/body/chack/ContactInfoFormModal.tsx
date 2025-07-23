// ContactInfoFormModal.tsx
"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ContactInfo } from './CheckoutContext';
import { useCheckout } from './CheckoutContext';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name').min(3, 'Name must be at least 3 characters'),
  email: yup.string().email('Enter corect email').required('Email must be provided'),
  phoneNumber: yup.string()
    .matches(/^\+\d{10,15}$/, 'Phone number must start from "+" and contain from 10 to 15 numbers')
    .required('Phone number must be provided'),
});

interface ContactInfoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContactInfo: ContactInfo;
}

const ContactInfoFormModal: React.FC<ContactInfoFormModalProps> = ({ isOpen, onClose, currentContactInfo }) => {
  const { dispatch } = useCheckout();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInfo>({
    resolver: yupResolver(schema),
    defaultValues: currentContactInfo,
  });

  useEffect(() => {
    if (isOpen) {
      reset(currentContactInfo);
    }
  }, [isOpen, currentContactInfo, reset]);

  const onSubmit = (data: ContactInfo) => {
    dispatch({ type: 'UPDATE_CONTACT_INFO', payload: data });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
        <h3 className="text-xl font-semibold mb-6 text-orange-500">Change Contact info</h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              FullName <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              className={`mt-1 block w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter full name"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              {...register('phoneNumber')}
              className={`mt-1 block w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="example: +66123456789"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInfoFormModal;