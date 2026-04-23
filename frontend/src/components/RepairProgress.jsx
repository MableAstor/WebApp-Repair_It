export default function RepairProgress({ status }) {
    const stepIndex =
        {
            PENDING: 0,
            IN_PROGRESS: 1,
            COMPLETED: 2,
            REJECTED: 2,
        }[status] ?? 0

    const progressPercent = stepIndex * 50

    return (
        <div className="mt-4 px-2">
            <div className="relative flex items-center justify-between">
                <div className="absolute left-4 right-4 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#D9D2E9]" />

                <div
                    className="absolute left-4 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#6C63FF] transition-all duration-700 ease-in-out"
                    style={{ width: `calc(${progressPercent}% - 8px)` }}
                />

                <div className="z-10 flex flex-col items-center">
                    <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                            stepIndex === 0
                                ? 'bg-[#6C63FF] text-white shadow-md scale-105'
                                : stepIndex > 0
                                    ? 'bg-[#EEEAFE] text-[#6C63FF]'
                                    : 'bg-[#F3F1F8] text-[#B8B2C9]'
                        }`}
                    >
                        ●
                    </div>
                    <span
                        className={`text-[11px] mt-2 transition-all duration-500 ${
                            stepIndex === 0 ? 'text-[#6C63FF] font-semibold' : 'text-[#9B94AE]'
                        }`}
                    >
            รับเรื่อง
          </span>
                </div>

                <div className="z-10 flex flex-col items-center">
                    <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                            stepIndex === 1
                                ? 'bg-[#6C63FF] text-white shadow-md scale-105 animate-pulse'
                                : stepIndex > 1
                                    ? 'bg-[#EEEAFE] text-[#6C63FF]'
                                    : 'bg-[#F3F1F8] text-[#B8B2C9]'
                        }`}
                    >
                        ⚙
                    </div>
                    <span
                        className={`text-[11px] mt-2 transition-all duration-500 ${
                            stepIndex === 1 ? 'text-[#6C63FF] font-semibold' : 'text-[#9B94AE]'
                        }`}
                    >
            กำลังซ่อม
          </span>
                </div>

                <div className="z-10 flex flex-col items-center">
                    <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${
                            stepIndex === 2
                                ? 'bg-[#22C55E] text-white shadow-md scale-105'
                                : 'bg-[#F3F1F8] text-[#B8B2C9]'
                        }`}
                    >
                        ✓
                    </div>
                    <span
                        className={`text-[11px] mt-2 transition-all duration-500 ${
                            stepIndex === 2 ? 'text-[#22C55E] font-semibold' : 'text-[#9B94AE]'
                        }`}
                    >
            เสร็จแล้ว
          </span>
                </div>
            </div>
        </div>
    )
}