import React from 'react';
import Navbar from './components/Navbar.jsx';
import StatusCard from './components/StatusCard.jsx'; // นำเข้า Component กล่องสถานะ

export default function AiAssist() {
    return (
        // พื้นหลังสีม่วงอ่อน กว้างเต็มจอ
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">
            
            {/* Navbar เปิดปุ่มย้อนกลับ */}
            <Navbar title="AI ASSIST" showBack={true} />

            {/* แถบสถานการณ์ปัจจุบันสีขาว (Sub-header) */}
            <div className="w-full bg-white py-3 shadow-sm flex justify-center items-center">
                <span className="font-bold text-gray-800 text-[18px] tracking-wide">
                    สถานการณ์ปัจจุบัน ⚠️
                </span>
            </div>

            {/* พื้นที่จัดกึ่งกลางสำหรับเนื้อหา */}
            <div className="flex-1 flex justify-center w-full">
                
                {/* กล่องจำกัดความกว้าง (Mobile Container) */}
                <div className="w-full max-w-md px-6 py-6 flex flex-col">
                    
                    {/* โปรไฟล์ AI (ดึงรูป proai.svg มาใช้) */}
                    <div className="flex items-center gap-4 mb-6 mt-2">
                        {/* รูปโปรไฟล์ AI */}
                        <div className="w-[3.5rem] h-[3.5rem] rounded-full shadow-md overflow-hidden bg-[#433D8B] flex items-center justify-center">
                            <img src="/proai.svg" alt="AI Profile" className="w-full h-full object-cover" />
                        </div>
                        {/* ชื่อ AI */}
                        <span className="font-bold text-gray-900 text-[16px]">
                            น้องโทบี้มาแก้ปัญหา
                        </span>
                    </div>

                    {/* รายการงานที่กำลังทำ (เรียกใช้ Component StatusCard) */}
                    <div className="flex flex-col gap-2">
                        
                        <StatusCard 
                            text="อาคาร 7 ชั้น 9 ห้อง 3 : เจ้าหน้าที่กำลังเข้าไปซ่อมแซมโต๊ะเล็คเชอร์" 
                        />
                        
                        <StatusCard 
                            text="อาคาร 1 ชั้น 4 ห้อง 4 : เจ้าหน้าที่กำลังเข้าไปติดตั้งหลอดไฟ" 
                        />
                        
                    </div>

                </div>
            </div>
        </div>
    );
}