import React, { useState, useEffect } from "react";
import NavbarAdmin from "./components/NavbarAdmin";
import PendingCard from "./components/PendingCard";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

export default function Pending() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const technicianId = user?.id;

        if (!technicianId) {
          console.error("ไม่พบ technician id");
          setRequests([]);
          setLoading(false);
          return;
        }

        const response = await fetch(
            `${API_BASE}/api/repair-requests/status/PENDING`
        );

        if (!response.ok) {
          throw new Error("ดึงข้อมูลงานไม่สำเร็จ");
        }

        const data = await response.json();
        console.log("assigned requests =", data);

        const pendingOnly = data
            .filter((item) => !item.assignedTo && item.status?.toUpperCase() === "PENDING")
            .map((item) => ({
              id: item.id,
              title: item.category || "ไม่ระบุหมวด",   // 👈 เปลี่ยนตรงนี้
              description: item.description || "แจ้งซ่อม", // 👈 เก็บ description ไว้
              location: item.location
                  ? `${item.location.building || ""} ชั้น ${item.location.floor || ""} ห้อง ${item.location.room || ""}`.trim()
                  : "ไม่ระบุสถานที่",
              urgency: item.severity || "ไม่ระบุ",
            }));

        setRequests(pendingOnly);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingData();
  }, []);

  const handleViewDetail = (id) => {
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