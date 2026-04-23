import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import AiAssistCard from './components/AiAssistCard.jsx'

export default function AiAssist() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:8080/api/repair-requests/ai-queue')
                .then(res => res.json())
                .then(data => {
                    setItems(data)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                })
        }

        fetchData()
        const interval = setInterval(fetchData, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">
            <Navbar title="AI ASSIST" showBack={true} />

            <div className="w-full bg-white py-3 shadow-sm flex justify-center items-center">
        <span className="font-bold text-gray-800 text-[18px] tracking-wide">
          สถานการณ์ปัจจุบัน ⚠️
        </span>
            </div>

            <div className="flex-1 flex justify-center w-full">
                <div className="w-full max-w-md px-6 py-6 flex flex-col">
                    <div className="flex items-center gap-4 mb-6 mt-2">
                        <div className="w-[3.5rem] h-[3.5rem] rounded-full shadow-md overflow-hidden bg-[#433D8B] flex items-center justify-center">
                            <img src="/proai.svg" alt="AI Profile" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-gray-900 text-[16px]">
              น้องโทบี้มาแก้ปัญหา
            </span>
                    </div>

                    {loading && (
                        <div className="text-center py-6">กำลังโหลดข้อมูล...</div>
                    )}

                    <div className="flex flex-col gap-4">
                        {items
                            .filter((item) => item.status !== 'REJECTED')
                            .map((item) => (
                                <AiAssistCard key={item.id} item={item} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}