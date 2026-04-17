import React from 'react';
import Navbar from './components/Navbar.jsx';
// สมมติว่าเราแยก Select ของหน้านี้ไว้ชื่อ Select2 เพื่อไม่ให้ซ้ำกับหน้าแรก
import Select02 from './components/Select02.jsx';
import Btncamera from './components/Btncamera.jsx';
import Btnupload from './components/Btnupload.jsx';
import { useNavigate } from 'react-router-dom';

export default function Report02() {
    const navigate = useNavigate();

    return (
        // กล่องนอกสุด (กว้างเต็มจอ)
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">

            {/* Navbar กว้าง 100% พร้อมเปิดปุ่มย้อนกลับ */}
            <Navbar title="REPORT IT" showBack={true} />

            {/* ส่วนจัดกึ่งกลางเนื้อหา */}
            <div className="flex-1 flex justify-center w-full">

                {/* กล่องเนื้อหา (จำกัดความกว้างแค่มือถือ) */}
                <div className="w-full max-w-md flex flex-col px-6 py-6">

                    <div className="mb-5">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">แจ้งเรื่องภายในอาคารและนอกอาคาร</h3>
                        <Select02 />
                    </div>

                    <div className="mb-5">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">แจ้งรายละเอียดเรื่อง</h3>
                        <textarea
                            placeholder="เช่น ประตูพัง หน้าห้อง 2501"
                            className="w-full h-32 p-5 rounded-3xl bg-white border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC] resize-none text-sm text-gray-700 placeholder-gray-400"
                        ></textarea>
                    </div>

                    {/* ส่วนที่ 3: แนบรูป */}
                    <div className="mb-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">แนบรูป</h3>

                        <div className="flex gap-3 mb-4">
                            <Btncamera />
                            <Btnupload />
                        </div>

                        <div className="w-full h-48 bg-white rounded-3xl shadow-sm flex-1 min-h-[160px]"></div>
                    </div>

                    {/* ส่วนที่ 4: ปุ่มส่งเรื่อง */}
                    <div className="mt-auto pb-8 pt-4">
                        <button
                            onClick={() => navigate('/submit')}
                            className="w-full bg-[#433D8B] text-white py-4 rounded-2xl font-bold text-[22px] hover:bg-[#342f6d] transition-colors shadow-md tracking-wide"
                        >
                            ส่งเรื่อง
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}