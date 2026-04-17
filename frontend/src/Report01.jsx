import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Select from './components/Select.jsx';
import Btncamera from './components/Btncamera.jsx';
import Btnupload from './components/Btnupload.jsx';
import { useNavigate } from 'react-router-dom';
import SelectRoom from "./components/SelectRoom.jsx";
import SelectBuilding from "./components/SelectBuilding.jsx";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default function Report01() {
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [building, setBuilding] = useState('');
    const [room, setRoom] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [position, setPosition] = useState(null);

    const UTCC_CENTER = [13.7796, 100.5603];

    if (!currentUser) {
        alert('กรุณา login ก่อน');
        navigate('/');
        return;
    }
    const categoryMap = {
        AIR_CONDITIONER: 'AIR_CONDITIONER',
        ELECTRICAL_PROJECTOR: 'ELECTRICAL',
        ELECTRICAL_LIGHT: 'ELECTRICAL',
        WATER_PIPE: 'WATER',
        WATER_SINK: 'WATER',
        WATER_TOILET: 'WATER',
        FURNITURE: 'FURNITURE',
        NETWORK: 'NETWORK',
        CLEANING: 'CLEANING',
        OTHER: 'OTHER',
    };
    const categoryLabelMap = {
        AIR_CONDITIONER: 'เครื่องปรับอากาศ',
        ELECTRICAL_PROJECTOR: 'โปรเจ็คเตอร์',
        ELECTRICAL_LIGHT: 'หลอดไฟ',
        WATER_PIPE: 'ท่อน้ำ',
        WATER_SINK: 'อ่างล้างมือ',
        WATER_TOILET: 'ชักโครก',
        FURNITURE: 'โต๊ะเล็กเก้าอี้',
        NETWORK: 'คอมพิวเตอร์',
        CLEANING: 'งานทำความสะอาด',
        OTHER: 'อื่น ๆ',
    };
    const handleBuildingChange = (value) => {
        setBuilding(value);
        setRoom('');
    };

    function LocationPicker({ setPosition }) {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
            },
        });
        return null;
    }
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    });

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const updatedFiles = [...imageFiles, ...files];
        setImageFiles(updatedFiles);

        const updatedPreviews = updatedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(updatedPreviews);
    };

    const handleSubmit = async () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        if (!currentUser) {
            alert('กรุณา login ก่อน');
            navigate('/');
            return;
        }

        if (!description.trim() && !locationDescription.trim()) {
            alert('กรุณากรอกรายละเอียด');
            return;
        }

        try {
            setLoading(true);

            // STEP 1: create request ด้วย JSON
            const createRes = await fetch('http://localhost:8080/api/repair-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: 'แจ้งซ่อม',
                    description: `${categoryLabelMap[category] || ''} ${description || ''}`.trim(),
                    category: categoryMap[category] || null,
                    createdByUserId: currentUser.id,
                    building: building,
                    floor: '-',
                    room: room,
                    locationDescription: position
                        ? `${description} | พิกัด: ${position.lat}, ${position.lng}`
                        : description
                })
            });

            if (!createRes.ok) {
                const errorText = await createRes.text();
                throw new Error(errorText || 'สร้างรายการแจ้งซ่อมไม่สำเร็จ');
            }

            const createdData = await createRes.json();
            const requestId = createdData.id;

            // STEP 2: upload รูป ถ้ามี
            if (imageFiles.length > 0) {
                const formData = new FormData();

                imageFiles.forEach((file) => {
                    formData.append('files', file);
                });

                const uploadRes = await fetch(
                    `http://localhost:8080/api/repair-requests/${requestId}/upload-images`,
                    {
                        method: 'POST',
                        body: formData
                    }
                );

                if (!uploadRes.ok) {
                    const errorText = await uploadRes.text();
                    throw new Error(errorText || 'อัปโหลดรูปไม่สำเร็จ');
                }
            }

            alert('ส่งเรื่องสำเร็จ');
            navigate('/submit');
        } catch (err) {
            console.error(err);
            alert(err.message || 'ส่งเรื่องไม่สำเร็จ');
        } finally {
            setLoading(false);
        }
    };

    return (
        // กล่องนอกสุด (กว้างเต็มจอ)
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">

            {/* Navbar เปิดปุ่มย้อนกลับ */}
            <Navbar title="REPORT IT" showBack={true} />

            {/* ส่วนจัดกึ่งกลางเนื้อหา */}
            <div className="flex-1 flex justify-center w-full">

                {/* กล่องเนื้อหา (จำกัดความกว้างแค่มือถือ) */}
                <div className="w-full max-w-md flex flex-col px-6 py-6">

                    <div className="mb-5">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">แจ้งเรื่องเครื่องใช้สาธารณูปโภคชำรุด</h3>
                        <Select category={category} setCategory={setCategory} />
                    </div>
                    <div className="mb-5">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">ปักหมุด</h3>

                        <MapContainer
                            center={UTCC_CENTER}
                            zoom={17}
                            style={{ height: '300px', width: '100%' }}
                        >
                            <TileLayer
                                attribution="&copy; OpenStreetMap"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <LocationPicker setPosition={setPosition} />

                            {position && <Marker position={position} />}
                        </MapContainer>

                        {position && (
                            <p>
                                พิกัด: {position.lat}, {position.lng}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="mb-5">
                            <h3 className="font-bold text-gray-900 mb-3 text-[16px]">เลือกอาคาร</h3>
                            <SelectBuilding value={building} onChange={handleBuildingChange} />
                        </div>

                        <div className="mb-5">
                            <h3 className="font-bold text-gray-900 mb-3 text-[16px]">เลือกห้อง</h3>
                            <SelectRoom building={building} value={room} onChange={setRoom} />
                        </div>
                    </div>


                    <div className="mb-5">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">แจ้งรายละเอียดเรื่อง</h3>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="เช่น ประตูพัง หน้าห้อง 2501"
                            className="w-full h-32 p-5 rounded-3xl bg-white border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7670AC] resize-none text-sm text-gray-700 placeholder-gray-400"
                        ></textarea>
                    </div>

                    <div className="mb-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-900 mb-3 text-[16px]">แนบรูป</h3>

                        <div className="flex gap-3 mb-4">
                            <Btncamera onChange={handleFileChange} />
                            <Btnupload onChange={handleFileChange} />
                        </div>

                        <div className="w-full h-60 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden">
                            {previewUrls.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {previewUrls.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`preview-${index}`}
                                            className="w-full h-32 object-cover rounded-2xl"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="h-48 flex items-center justify-center text-gray-400">
                                    ยังไม่มีรูป
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto pb-8 pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-[#433D8B] text-white py-4 rounded-2xl font-bold text-[22px]"
                        >
                            {loading ? 'กำลังส่ง...' : 'ส่งเรื่อง'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}