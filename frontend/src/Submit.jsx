import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

export default function Submit() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">
            
            {/* Navbar (ไม่มีปุ่มย้อนกลับ) */}
            <Navbar title="SUBMIT" showBack={false} />

            {/* พื้นที่จัด Card ให้อยู่กึ่งกลางจอ */}
            <div className="flex-1 flex justify-center w-full items-start pt-12">
                
                {/* กล่อง Card หลัก (ตัดขอบโค้ง overflow-hidden เพื่อไม่ให้ Header ทะลุขอบ) */}
                <div className="w-full max-w-sm mx-6 bg-white rounded-[1.5rem] shadow-xl overflow-hidden flex flex-col">
                    
                    {/* ส่วน Header ของ Card */}
                    <div className="bg-[#433D8B] py-3 px-5 flex items-center relative">
                        {/* วงกลมสีแดงกับเหลืองมุมซ้าย ตกแต่งเฉยๆ */}
                        <div className="flex gap-2 absolute left-5">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#D9381E] shadow-sm"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#F2C94C] shadow-sm"></div>
                        </div>
                        {/* ข้อความตรงกลาง */}
                        <span className="text-white text-center w-full text-[15px] font-medium tracking-wide">
                            น้องโทบี้มาแก้ปัญหา
                        </span>
                    </div>

                    {/* ส่วนเนื้อหาภายใน Card */}
                    <div className="p-8 flex flex-col items-center">
                        
                        <p className="text-center font-bold text-gray-900 text-[18px] leading-relaxed mb-8">
                            ขอบคุณที่แจ้งให้ทราบทางเราจะแจ้ง<br />
                            ให้เจ้าหน้าที่เข้าไปซ่อมแซมโดยเร็ว!
                        </p>

                        {/* รูปน้องโทบี้จ้า */}
                        <img src="/ty.svg" alt="Thank You น้องโทบี้" className="w-48 mb-12 drop-shadow-sm" />

                        {/* ปุ่มกลับหน้าแรก */}
                        <button
                            onClick={() => navigate('/home')}
                            className="w-full bg-[#433D8B] text-white py-3.5 rounded-2xl font-bold text-[20px] hover:bg-[#342f6d] transition-all active:scale-95 shadow-md"
                        >
                            กลับไปหน้าแรก
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}