import React from "react";

export default function PendingCard({ data, onClickDetail }) {
    return (
        <div className="bg-white rounded-[1.8rem] p-4 mb-4 shadow-sm w-full">
            {/* กล่องข้อมูลด้านใน */}
            <div className="bg-[#E7E7EA] rounded-[20px] px-4 py-4">
                <h2 className="text-black font-bold text-[20px] leading-snug mb-2">
                    {data.location || "ไม่ระบุสถานที่"} : รอเจ้าหน้าที่รับเรื่อง
                </h2>
                <p className="text-gray-700 text-[16px] mb-2">
                    {data.description}
                </p>

                <div className="flex gap-2 flex-wrap">
          <span className="bg-white text-red-500 text-[14px] px-3 py-1 rounded-full font-medium">
            {data.urgency || "ไม่ระบุ"}
          </span>

                    <span className="bg-[#EAD9FF] text-purple-600 text-[14px] px-3 py-1 rounded-full font-medium">
            {data.category || "ไม่ระบุหมวด"}
          </span>
                </div>
            </div>

            {/* ปุ่ม */}
            <button
                onClick={() => onClickDetail(data.id)}
                className="mt-5 px-2 w-full bg-[#433D8B] text-white py-3 rounded-2xl font-bold text-[16px] hover:bg-[#342f6d] transition-colors shadow-sm active:scale-95"
            >
                ดูรายละเอียด
            </button>
        </div>
    );
}