import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Select02 from './components/Select02.jsx';
import Btncamera from './components/Btncamera.jsx';
import Btnupload from './components/Btnupload.jsx';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function Report02() {
    const navigate = useNavigate();

    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const categoryMap = {
        OTHER_FLOOR: 'OTHER',
        OTHER_CEILING: 'OTHER',
        OTHER_WALL: 'OTHER',
        OTHER_DOOR: 'OTHER',
        OTHER_ELEVATOR: 'OTHER',
        OTHER_STAIRS: 'OTHER',
        OTHER_WINDOW: 'OTHER',
    };

    const categoryLabelMap = {
        OTHER_FLOOR: 'พื้น',
        OTHER_CEILING: 'เพดาน',
        OTHER_WALL: 'กำแพง',
        OTHER_DOOR: 'ประตู',
        OTHER_ELEVATOR: 'ลิฟต์',
        OTHER_STAIRS: 'บันได',
        OTHER_WINDOW: 'หน้าต่าง',
    };

    const handleSubmit = async () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser || !currentUser.id) {
            alert('กรุณาเข้าสู่ระบบก่อน');
            navigate('/login');
            return;
        }

        if (!category) {
            alert('กรุณาเลือกประเภทปัญหา');
            return;
        }

        if (!description.trim()) {
            alert('กรุณากรอกรายละเอียด');
            return;
        }

        try {
            setSubmitting(true);

            const response = await fetch(`${API_BASE}/api/repair-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'แจ้งซ่อมภายในอาคารและนอกอาคาร',
                    description: `${categoryLabelMap[category] || ''} ${description}`.trim(),
                    category: categoryMap[category] || 'OTHER',
                    createdByUserId: currentUser.id,
                    building: '-',
                    floor: '-',
                    room: '-',
                    locationDescription: '-',
                    latitude: null,
                    longitude: null,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Create request failed:', errorText);
                alert('ส่งเรื่องไม่สำเร็จ');
                return;
            }

            alert('ส่งเรื่องสำเร็จ');
            navigate('/submit');
        } catch (error) {
            console.error('Submit error:', error);
            alert('เกิดข้อผิดพลาดในการส่งเรื่อง');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">
            <Navbar title="REPORT IT" showBack={true} />

            <div className="flex-1 flex justify-center w-full">
                <div className="w-full max-w-md flex flex-col px-6 py-6">
                    <div className="mb-5">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">
                            แจ้งเรื่องภายในอาคารและนอกอาคาร
                        </h3>
                        <Select02 category={category} setCategory={setCategory} />
                    </div>

                    <div className="mb-5">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">
                            แจ้งรายละเอียดเรื่อง
                        </h3>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="เช่น ประตูพัง หน้าห้อง 2501"
                            className="w-full h-32 p-5 rounded-3xl bg-white border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC] resize-none text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    <div className="mb-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">แนบรูป</h3>

                        <div className="flex gap-3 mb-4">
                            <Btncamera />
                            <Btnupload />
                        </div>

                        <div className="w-full h-48 bg-white rounded-3xl shadow-sm flex-1 min-h-[160px]"></div>
                    </div>

                    <div className="mt-auto pb-8 pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full bg-[#433D8B] text-white py-4 rounded-2xl font-bold text-[22px] hover:bg-[#342f6d] transition-colors shadow-md tracking-wide disabled:opacity-60"
                        >
                            {submitting ? 'กำลังส่ง...' : 'ส่งเรื่อง'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}