import React from 'react';
import Image from 'next/image';

const MailIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
);
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 004.28 4.28l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
);
const InstagramIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const FacebookIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TelegramIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.13-1.04 1.4-1.74.88L9.78 18.65z"></path></svg>
);
const SendIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
);
const ChatIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"></path></svg>
);


const Footer = () => {
  return (
    <footer className="hidden lg:block bg-gray-50 text-gray-700 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo and Copyright */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <Image
                  src="/footer_logo.svg"
                  alt="category"
                  width={140}
                  height={40}
              />
            </div>

          </div>
          <p className="text-xs text-gray-400 mt-8">
            © 2024 Tentai - Find it. Choose. Make life more convenient.
          </p>
        </div>

        {/* Column 2: Documents */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Documents</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-600">User agreement</a></li>
            <li><a href="#" className="hover:text-purple-600">More documents</a></li>
          </ul>
        </div>

        {/* Column 3: Contacts */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Contacts</h3>
          <ul className="space-y-3">
            <li className="flex items-center">
              <MailIcon />
              <a href="mailto:example@imail.com" className="ml-3 hover:text-purple-600">example@imail.com</a>
            </li>
            <li className="flex items-center">
              <PhoneIcon />
              <a href="tel:+66123456789" className="ml-3 hover:text-purple-600">+66123456789</a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-6 text-gray-500">
            <a href="#" className="hover:text-pink-500"><InstagramIcon /></a>
            <a href="#" className="hover:text-blue-600"><FacebookIcon /></a>
            <a href="#" className="hover:text-sky-500"><TelegramIcon /></a>
            <a href="#" className="hover:text-gray-800"><SendIcon /></a>
            <a href="#" className="hover:text-purple-600"><ChatIcon /></a>
          </div>
        </div>

        {/* Column 4: Download App & Language */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Download Tentai App</h3>
          <div className="flex space-x-3 mb-6">
            <a href="#"><img src="https://placehold.co/40x40/f43f5e/ffffff?text=A" alt="App Store" className="h-10"/></a>
            <a href="#"><img src="https://placehold.co/40x40/22c55e/ffffff?text=G" alt="Google Play" className="h-10"/></a>
            <a href="#"><img src="https://placehold.co/40x40/f97316/ffffff?text=H" alt="App Gallery" className="h-10"/></a>
          </div>
          <div className="relative">
            <button className="bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-40 text-left">
              <span>English</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;