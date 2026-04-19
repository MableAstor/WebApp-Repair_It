import React from "react";

export default function FinishedCard({ data, onClickDetail }) {
  return (
    // ใส่ relative เพื่อให้ไอคอนเครื่องหมายถูก ลอยอยู่มุมขวาบนได้
    <div className="bg-white rounded-3xl p-6 mb-5 shadow-sm w-full flex flex-col relative">
      {/* ไอคอนเครื่องหมายถูกสีเขียว */}
      <div className="absolute top-6 right-6 bg-[#8CC63F] text-white rounded-lg w-10 h-10 flex items-center justify-center shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 font-bold"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* สถานที่ */}
      <div className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#505052"
          class="bi bi-buildings-fill w-6 h-6"
          viewBox="0 0 16 16"
        >
          <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z" />
        </svg>
        {data.location}
      </div>

      {/* หัวข้อปัญหา */}
      <h2 className="text-black font-bold text-3xl mb-2">{data.title}</h2>

      {/* ระดับความเร่งด่วน */}
      <p className="text-gray-800 font-medium text-[16px] mb-6">
        ความเร่งด่วน : <span className="text-gray-900">{data.urgency}</span>
      </p>

      {/* ปุ่มกดดูรายละเอียด */}
      <button
        onClick={() => onClickDetail(data.id)}
        className="w-full bg-[#433D8B] text-white py-3 rounded-2xl font-bold text-[16px] hover:bg-[#342f6d] transition-colors shadow-sm active:scale-95"
      >
        ดูรายละเอียด
      </button>
    </div>
  );
}
