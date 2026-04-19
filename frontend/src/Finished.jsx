import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./components/NavbarAdmin";
import FinishedCard from "./components/FinishedCard";

export default function Finished() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // จำลองดึงข้อมูลงานที่เสร็จสิ้นแล้ว
  useEffect(() => {
    const fetchFinishedData = async () => {
      setLoading(true);
      // 🚀 ของจริง: const response = await fetch('http://localhost:8080/api/finished-requests');
      // 🚀 ของจริง: const data = await response.json();

      const mockData = [
        {
          id: 201,
          location: "อาคาร 7 ชั้น 9 ห้อง 3",
          title: "ขาโต๊ะหัก",
          urgency: "อันตราย",
        },
        {
          id: 202,
          location: "อาคาร 7 ชั้น 9 ห้อง 3",
          title: "ขาโต๊ะหัก",
          urgency: "อันตราย",
        },
      ];

      setTimeout(() => {
        setRequests(mockData);
        setLoading(false);
      }, 500);
    };

    fetchFinishedData();
  }, []);

  const handleViewDetail = (id) => {
    // ใช้หน้า ProcessDetails ร่วมกันได้เลย เพราะหน้านั้นมีแค่ปุ่มย้อนกลับอย่างเดียว
    navigate(`/process-details/${id}`);
  };

  return (
    <NavbarAdmin title="finished">
      {loading ? (
        <div className="flex justify-center items-center h-48 w-full">
          <span className="text-gray-600 font-bold text-lg">
            กำลังโหลดข้อมูล...
          </span>
        </div>
      ) : requests.length > 0 ? (
        requests.map((item) => (
          <FinishedCard
            key={item.id}
            data={item}
            onClickDetail={handleViewDetail}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10 w-full">
          ไม่มีรายการแจ้งซ่อมที่เสร็จสิ้น
        </div>
      )}
    </NavbarAdmin>
  );
}
