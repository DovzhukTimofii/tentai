import React from 'react';
import Image from 'next/image';

const MailIcon = () => (
  <Image
    src="/email.svg"
    alt="email"
    width={19.5}
    height={15.5}
  />
);
const PhoneIcon = () => (
  <Image
    src="/phone.svg"
    alt="phone"
    width={19.5}
    height={15.5}
  />
);
const InstagramIcon = () => (
  <Image
    src="/instagram.svg"
    alt="instagram"
    width={16.01}
    height={16.01}
  />
);
const FacebookIcon = () => (
  <Image
    src="/facebook.svg"
    alt="facebook"
    width={8.66}
    height={16.01}
  />
);
const TelegramIcon = () => (
  <Image
    src="/telegram.svg"
    alt="telegram"
    width={14.72}
    height={12.49}
  />
);
const YouTubeIcon = () => (
    <Image
      src="/youtube.svg"
      alt="youtube"
      width={18.24}
      height={12.8}
    />
);
const LineIcon = () => (
    <Image
      src="/line.svg"
      alt="line"
      width={17.1}
      height={16.01}
    />
);


const Footer = () => {
  return (
    <footer className="hidden lg:block bg-[#F6F3F7] text-gray-700 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Documents</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-600">User agreement</a></li>
            <li><a href="#" className="hover:text-purple-600">More documents</a></li>
          </ul>
        </div>

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
          <div className="flex relative items-center space-x-4 mt-6 text-gray-500">
            <a href="#" className='w-[32px] h-[32px]'><InstagramIcon /></a>
            <a href="#" className='w-[32px] h-[32px]'><FacebookIcon /></a>
            <a href="#"className='w-[32px] h-[32px]'><TelegramIcon /></a>
            <a href="#"className='w-[32px] h-[32px]'><YouTubeIcon /></a>
            <a href="#"className='w-[32px] h-[32px]'><LineIcon /></a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Download Tentai App</h3>
          <div className="flex justify-between max-w-[142px] space-x-3 mb-6">
            <a href="#">
              <Image
                src="/apple.svg"
                alt="apple"
                width={18.08}
                height={22.31}
              />
            </a>
            <a href="#">
              <Image
                src="/google_play.svg"
                alt="google_play"
                width={18.75}
                height={20.97}
              />
            </a>
            <a href="#">
              <Image
                src="/huawey.svg"
                alt="huawey"
                width={21.3}
                height={20.77}
              />
            </a>
          </div>
          <div className="relative">
            <button className="bg-white rounded-md px-4 py-2 flex items-center justify-between w-40 text-left">
              <span className='font-semibold text-pink-600'>English</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;