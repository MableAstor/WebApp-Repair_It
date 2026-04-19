import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./components/NavbarAdmin";
import ProcessCard from "./components/ProcessCard";

export default function Process() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // จำลองการดึงข้อมูลงานที่กำลังทำ (In Process)
  useEffect(() => {
    const fetchProcessData = async () => {
      setLoading(true);
      // 🚀 โค้ดสำหรับ Backend ของจริง:
      // const response = await fetch('http://localhost:8080/api/process-requests');
      // const data = await response.json();

      const mockData = [
        {
          id: 101,
          location: "อาคาร 7 ชั้น 9 ห้อง 3",
          title: "ขาโต๊ะหัก",
          urgency: "อันตราย",
        },
        {
          id: 102,
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

    fetchProcessData();
  }, []);

  // ฟังก์ชันกดดูรายละเอียด
  const handleViewDetail = (id) => {
    // พาไปหน้ารายละเอียดเฉพาะของ Process
    navigate(`/process-details/${id}`);
  };

  // ฟังก์ชันกดทำเครื่องหมายว่าเสร็จสิ้น
  const handleMarkFinished = (id) => {
    // 🚀 ของจริง: ยิง API อัปเดตสถานะเป็น "Finished"
    alert(`อัปเดตงาน ID: ${id} เป็นเสร็จสิ้นแล้ว!`);
    // ลบรายการนั้นออกจากหน้าจอชั่วคราวเพื่อให้ดูสมจริง
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NavbarAdmin title="process">
      {loading ? (
        <div className="flex justify-center items-center h-48 w-full">
          <span className="text-gray-600 font-bold text-lg">
            กำลังโหลดข้อมูล...
          </span>
        </div>
      ) : requests.length > 0 ? (
        requests.map((item) => (
          <ProcessCard
            key={item.id}
            data={item}
            onClickDetail={handleViewDetail}
            onMarkFinished={handleMarkFinished}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10 w-full">
          ไม่มีรายการแจ้งซ่อมที่กำลังดำเนินการ
        </div>
      )}
    </NavbarAdmin>
  );
}
