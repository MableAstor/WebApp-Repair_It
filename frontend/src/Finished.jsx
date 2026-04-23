import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./components/NavbarAdmin";
import FinishedCard from "./components/FinishedCard";

const API_BASE = "http://localhost:8080";

export default function Finished() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinishedData = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));
        const technicianId = user?.id;

        if (!technicianId) {
          console.error("ไม่พบ technician id");
          setRequests([]);
          return;
        }

        const response = await fetch(
            `${API_BASE}/api/repair-requests/assigned/${technicianId}`
        );

        if (!response.ok) {
          throw new Error("ดึงข้อมูลงานไม่สำเร็จ");
        }

        const data = await response.json();
        console.log("FINISHED REQUESTS =", data);

        const finishedOnly = data
            .filter((item) => item.status?.toUpperCase() === "COMPLETED")
            .map((item) => ({
              id: item.id,
              location: item.location
                  ? [
                    item.location.building &&
                    `อาคาร ${String(item.location.building).replace(/building/i, "")}`,
                    item.location.floor && `ชั้น ${item.location.floor}`,
                    item.location.room && `ห้อง ${item.location.room}`,
                  ]
                      .filter(Boolean)
                      .join(" ")
                  : "ไม่ระบุสถานที่",
              title: item.category || "ไม่ระบุหมวด",
              description: item.description || "ไม่มีรายละเอียด",
              urgency: item.severity || "ไม่ระบุ",
              status: item.status,
            }));

        setRequests(finishedOnly);
      } catch (error) {
        console.error("Failed to fetch finished data:", error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedData();
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/process-details/${id}`);
  };

  const handleDeleteJob = async (id) => {
    const confirmed = window.confirm("ต้องการลบงานที่เสร็จแล้วนี้ใช่ไหม");
    if (!confirmed) return;

    try {
      const response = await fetch(
          `http://localhost:8080/api/repair-requests/${id}`,
          {
            method: "DELETE",
          }
      );

      const text = await response.text();
      console.log("DELETE RESPONSE =", response.status, text);

      if (!response.ok) {
        throw new Error(text || "ลบงานไม่สำเร็จ");
      }

      setRequests((prev) => prev.filter((item) => item.id !== id));
      alert("ลบงานสำเร็จ");
    } catch (error) {
      console.error(error);
      alert(error.message || "เกิดข้อผิดพลาด");
    }
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
                    onDelete={handleDeleteJob}
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