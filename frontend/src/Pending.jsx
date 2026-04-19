import React, { useState, useEffect } from "react";
import NavbarAdmin from "./components/NavbarAdmin";
import PendingCard from "./components/PendingCard"; // นำเข้า Component กล่องที่เราเพิ่งสร้าง
import { useNavigate } from "react-router-dom";

export default function Pending() {
  const navigate = useNavigate();
  // สร้าง State สำหรับเก็บข้อมูลที่ดึงมาจาก Backend
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // จำลองการดึงข้อมูลจาก Backend เมื่อโหลดหน้าเว็บเสร็จ
  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        setLoading(true);
        // ---------------------------------------------------------
        // 🚀 ตรงนี้คือจุดที่คุณต้องนำไปเปลี่ยนเป็นโค้ด Fetch API จริงๆ
        // const response = await fetch('http://localhost:8080/api/pending-requests');
        // const data = await response.json();
        // ---------------------------------------------------------

        // ข้อมูลจำลอง (Mock Data) ให้หน้าตาเหมือนที่ Backend จะส่งมาให้
        const mockDataFromBackend = [
          {
            id: 1,
            location: "อาคาร 7 ชั้น 9 ห้อง 3",
            title: "ขาโต๊ะหัก",
            urgency: "อันตราย",
          },
          {
            id: 2,
            location: "อาคาร 7 ชั้น 9 ห้อง 3",
            title: "เก้าอี้แตก",
            urgency: "อันตราย",
          },
        ];

        // จำลองเวลาโหลด 0.5 วินาที แล้วเอาข้อมูลใส่ State
        setTimeout(() => {
          setRequests(mockDataFromBackend);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchPendingData();
  }, []);

  // ฟังก์ชันเมื่อกดปุ่ม "กดเพื่อดูรายละเอียด"
  const handleViewDetail = (id) => {
    console.log("ไปที่หน้ารายละเอียดของ ID:", id);
    navigate(`/details/${id}`);
  };

  return (
    <NavbarAdmin title="Pending">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-gray-600 font-bold text-lg">
            กำลังโหลดข้อมูล...
          </span>
        </div>
      ) : requests.length > 0 ? (
        requests.map((item) => (
          <PendingCard
            key={item.id}
            data={item}
            onClickDetail={handleViewDetail}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10">
          ไม่มีรายการแจ้งซ่อมที่รอดำเนินการ
        </div>
      )}
    </NavbarAdmin>
  );
}
