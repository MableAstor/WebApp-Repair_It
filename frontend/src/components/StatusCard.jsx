import React from 'react';

// รับค่า text (ข้อความที่จะแสดง) เข้ามาเป็น Prop
export default function StatusCard({ text }) {
    return (
        <div className="bg-white rounded-[1.5rem] p-4 mb-4 shadow-sm w-full">
            
            {/* กล่องสีเทาอ่อนด้านในสำหรับใส่ข้อความ */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 mb-4 min-h-[80px] flex items-center">
                <p className="font-bold text-gray-900 text-[15px] leading-relaxed">
                    {text}
                </p>
            </div>

            {/* แถบติดตามสถานะ (Status Tracker) */}
            <div className="flex justify-center items-center gap-1 text-[#1B1A3A] px-2">
                
                {/* 1. ไอคอนกำลังดำเนินการ (รูป Loading) */}
                <img src="/loading.svg" alt="Upload Icon" className="w-7 h-7" />

                {/* เส้นประ */}
                <div className="flex-1 border-b-[2.5px] border-dotted border-gray-400 mx-1"></div>

                {/* 2. ไอคอนกำลังซ่อมแซม (รูปประแจไขว้) */}
                <img src="/repair.svg" alt="Repair Icon" className="w-7 h-7" />

                {/* เส้นประ */}
                <div className="flex-1 border-b-[2.5px] border-dotted border-gray-400 mx-1"></div>

                {/* 3. ไอคอนเสร็จสิ้น (เครื่องหมายถูกในวงกลม) */}
                <img src="/complete.svg" alt="Complete Icon" className="w-7 h-7" />

            </div>
        </div>
    );
}