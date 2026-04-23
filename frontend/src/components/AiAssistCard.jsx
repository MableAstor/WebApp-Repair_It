import RepairProgress from './RepairProgress.jsx'

export default function AiAssistCard({ item }) {
    const building = item.location?.building || '-'
    const floor = item.location?.floor || '-'
    const room = item.location?.room || '-'

    function getStatusText(status) {
        if (status === 'PENDING') return 'รอเจ้าหน้าที่รับเรื่อง'
        if (status === 'IN_PROGRESS') return 'เจ้าหน้าที่กำลังเข้าซ่อม'
        if (status === 'COMPLETED') return 'ซ่อมเสร็จแล้ว'
        if (status === 'REJECTED') return 'รายการนี้ถูกยกเลิก'
        return 'กำลังตรวจสอบ'
    }

    return (
        <div className="bg-white rounded-[28px] p-4 shadow-[0_8px_20px_rgba(124,92,160,0.12)]">
            <div className="bg-[#F3F3F6] rounded-2xl p-4">
                <p className="font-semibold text-sm md:text-base text-[#1d1d1d] leading-relaxed">
                    อาคาร {String(item.location.building).replace(/building/i, "")} : {getStatusText(item.status)}
                </p>

                <p className="mt-2 text-sm md:text-base font-medium text-[#1d1d1d]">
                    {item.description || 'ไม่มีรายละเอียด'}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                    {item.aiSeverityScore === 3 && (
                        <span className="text-xs bg-[#FFE8E8] text-[#FF4D4F] px-3 py-1 rounded-full">
              งานเร่งด่วน
            </span>
                    )}

                    {item.aiTag && (
                        <span className="text-xs bg-[#F3E8FF] text-[#A020F0] px-3 py-1 rounded-full">
              {item.aiTag}
            </span>
                    )}

                    {item.assignedTo?.fullName && (
                        <span className="text-xs bg-[#E8F1FF] text-[#3B82F6] px-3 py-1 rounded-full">
              {item.assignedTo.fullName}
            </span>
                    )}
                </div>
            </div>

            <RepairProgress status={item.status} />
        </div>
    )
}