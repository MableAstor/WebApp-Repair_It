import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./components/NavbarAdmin";
import ProcessCard from "./components/ProcessCard";

const API_BASE = "http://localhost:8080";

export default function Process() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcessData = async () => {
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
        console.log("PROCESS REQUESTS =", data);

        const processOnly = data
            .filter((item) => item.status?.toUpperCase() !== "COMPLETED")
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

        setRequests(processOnly);
      } catch (error) {
        console.error("Failed to fetch process data:", error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessData();
  }, []);

  const handleViewDetail = (id) => {
    navigate(`/process-details/${id}`);
  };

  const handleMarkFinished = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch(
          `${API_BASE}/api/repair-requests/${id}/status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "COMPLETED",
              changedByUserId: user.id,
              remark: "ซ่อมเสร็จแล้ว",
            }),
          }
      );

      if (!response.ok) {
        throw new Error("อัปเดตสถานะไม่สำเร็จ");
      }

      setRequests((prev) => prev.filter((item) => item.id !== id));
      alert("อัปเดตงานเป็นเสร็จสิ้นแล้ว");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาด");
    }
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