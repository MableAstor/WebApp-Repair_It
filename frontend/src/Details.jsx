import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Details() {
  const { id } = useParams(); // รับค่า ID จาก URL
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // จำลองการดึงข้อมูลจาก Backend ตาม ID ที่ได้รับ
  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      // 🚀 ของจริง: const response = await fetch(`http://localhost:8080/api/requests/${id}`);
      // 🚀 ของจริง: const result = await response.json();

      // ข้อมูลจำลอง (Mock Data)
      const mockData = {
        id: id,
        location: "อาคาร 7 ชั้น 9 ห้อง 3",
        description: "ขาโต๊ะหักตอนนั่งลงไปค่ะ บลาบลาบลา",
        urgency: "อันตราย",
        images: [
          "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=300&q=80",
          "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=300&q=80",
        ],
      };

      setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 500);
    };

    fetchDetail();
  }, [id]);

  // ฟังก์ชันรับงาน
  const handleAcceptJob = () => {
    // 🚀 ของจริง: ยิง API เพื่ออัปเดตสถานะงานเป็น "รับงานแล้ว" (In Process)
    alert("รับงานนี้เรียบร้อยแล้ว!");
    navigate("/process"); // เปลี่ยนหน้าไปที่หมวดหมู่งานที่รับ
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#CDBCDB] flex justify-center items-center">
        <span className="text-gray-600 font-bold text-lg">
          กำลังโหลดข้อมูล...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#CDBCDB] font-sans flex flex-col">
      {/* Navbar ด้านบน */}
      <Navbar title="Details" showBack={true} />

      <div className="flex-1 flex justify-center w-full pt-6">
        <div className="w-full max-w-md flex flex-col px-6 pb-10 gap-5">
          {/* กล่องที่ 1: รายละเอียดข้อมูล */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            {/* หัวข้อสถานที่ + ไอคอนปักหมุด */}
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#505052"
                className="bi bi-buildings-fill w-6 h-6"
                viewBox="0 0 16 16"
              >
                <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z" />
              </svg>
              {data.location}
            </div>

            {/* รายละเอียด */}
            <p className="text-gray-900 font-bold text-[16px] mt-3">
              รายละเอียด :
            </p>
            <p className="text-gray-800 text-[15px] leading-relaxed mb-6">
              {data.description}
            </p>

            {/* ความเร่งด่วน + ไอคอนแจ้งเตือน */}
            <div className="flex items-center gap-2 text-gray-900 font-bold text-[16px]">
              ความเร่งด่วน : {data.urgency}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ed0404"
                className="bi bi-exclamation-triangle-fill w-5 h-5"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </div>
          </div>

          {/* กล่องที่ 2: รูปภาพประกอบ */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            {data.images && data.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {data.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`evidence-${index}`}
                    className="w-full h-32 object-cover rounded-xl border border-gray-100 shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">ไม่มีรูปภาพแนบ</p>
            )}
          </div>

          {/* กลุ่มปุ่มกดด้านล่าง */}
          <div className="flex flex-col gap-4 mt-2">
            <button
              onClick={handleAcceptJob}
              className="w-full bg-[#433D8B] text-white py-3.5 rounded-2xl font-bold text-[18px] hover:bg-[#342f6d] transition-colors shadow-sm active:scale-95"
            >
              รับงานนี้
            </button>
            <button
              onClick={() => navigate(-1)} // ย้อนกลับไปหน้าก่อนหน้า
              className="w-full bg-[#433D8B] text-white py-3.5 rounded-2xl font-bold text-[18px] hover:bg-[#342f6d] transition-colors shadow-sm active:scale-95"
            >
              ย้อนกลับ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
