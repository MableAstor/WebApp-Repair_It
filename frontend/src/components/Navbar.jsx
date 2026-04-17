import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ title = "LET REPAIR IT", showBack = false }) {
  const navigate = useNavigate(); // เรียกใช้งานระบบเปลี่ยนหน้า

  return (
    <div className="bg-[#433D8B] shadow-sm py-6 px-4 flex items-center justify-center relative w-full">
      
      {showBack && (
        <button 
          onClick={() => navigate(-1)} // navigate(-1) คือการสั่งให้เบราว์เซอร์กดย้อนกลับ 1 หน้า
          className="absolute left-4 text-[#1B1A3A] hover:text-white transition-colors p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      <a className="text-white text-3xl font-serif tracking-widest cursor-pointer text-center">
        {title}
      </a>
      
    </div>
  );
}