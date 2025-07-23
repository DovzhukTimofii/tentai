import React from 'react'
import Image from 'next/image';
import { NotificationBadge } from './NotificationBadge';

const Header = () => {
  return (
    <>
      <header className="hidden lg:block bg-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className='max-w-[717px] flex justify-between items-center w-full'>
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div>
              <button
                className="w-[154px] h-[40px] flex items-center justify-center space-x-2
                          font-semibold text-pink-600
                          px-[16px] py-[10px] rounded-lg
                          hover:h-[44px] hover:py-[12px]
                          transition-all duration-300 ease-in-out"
              >
                <Image
                  src="/grid_category.svg"
                  alt="category"
                  width={20}
                  height={20}
                />
                <span className="font-inter font-semibold text-sm leading-[128%] text-center">All categories</span>
              </button>
            </div>

            <div className="min-w-[473px] mx-4">
              <div className="relative w-full max-w-[473px] h-[40px]">
                <input
                  type="text"
                  placeholder="Search in Tentai"
                  className="w-full h-full pl-10 pr-4 py-2 rounded-[8px]
                            bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
                            font-normal text-sm leading-6 placeholder-gray-500"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600">
              <Image
                    src="/box.svg"
                    alt="box"
                    width={24}
                    height={24}
              />
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600 p-2" >Give prizes</p>
            </button>

            <div className="relative ml-12">
              <button className="text-gray-700 hover:text-purple-600">
                <Image
                  src="/cloud.svg"
                  alt="cloud"
                  width={24}
                  height={24}
                />
              </button>
              <NotificationBadge count={100} />
            </div>

            <div className="relative ml-12">
              <button className="text-gray-700 hover:text-purple-600">
                <Image
                  src="/bell.svg"
                  alt="bell"
                  width={24}
                  height={24}
                />
              </button>
              <NotificationBadge count={100} />
            </div>

            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/avatar.svg"
                alt="User Avatar"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <button
              className="w-[180px] h-[40px] flex items-center justify-center space-x-2
                        bg-gradient-to-r from-orange-500 to-purple-600 text-white
                        px-[28px] py-[10px] rounded-[6px] shadow-lg
                        hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span>Add offer</span>
            </button>
          </div>
        </div>
      </header>

      <header className="lg:hidden bg-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-start">
          <button className="mr-4 text-gray-700 hover:text-black">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <h1 className="hidden md:block text-lg font-semibold text-gray-800">Creating an advertisement</h1>
        </div>
      </header>
    </>
  );
};

export default Header;