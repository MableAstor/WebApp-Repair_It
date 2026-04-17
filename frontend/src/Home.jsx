import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

const Home = () => {
    const navigate = useNavigate();

    return (
        // กล่องนอกสุด (กว้างเต็มจอ)
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">
            
            <Navbar title="LET REPAIR IT" showBack={false} />

            {/* ส่วนจัดกึ่งกลางเนื้อหา */}
            <div className="flex-1 flex justify-center w-full">
                
                {/* กล่องเนื้อหา (จำกัดความกว้างแค่มือถือ) */}
                <div className="w-full max-w-md flex flex-col px-5 py-6 pb-24">
                    
                    <div className="text-center mb-4 text-gray-900 font-medium text-[20px]">
                        <p>เว็บแจ้งซ่อมออนไลน์</p>
                        <p>สำหรับบุคลากรและนักศึกษามหาวิทยาลัย</p>
                    </div>

                    <div className="bg-white rounded-[1.5rem] px-6 py-8 mb-6 shadow-sm text-center text-[16px] leading-relaxed text-gray-800 font-medium border border-white/50">
                        <p>
                            ยินดีต้อนรับสู่ระบบแจ้งซ่อมออนไลน์ เว็บไซต์นี้จัดทำขึ้นเพื่อเป็นช่องทางกลางให้นักศึกษาและบุคลากรแจ้งซ่อมบำรุงอาคารสถานที่ได้อย่างรวดเร็ว ช่วยลดขั้นตอนที่ยุ่งยาก และสามารถติดตามสถานะการดำเนินงานได้ทันที
                        </p>
                    </div>

                    <div className="bg-white rounded-[1.5rem] p-6 mb-4 shadow-sm flex flex-col items-center">
                        <h3 className="text-center font-bold text-gray-900 mb-5 text-[18px]">
                            รับแจ้งเรื่องเครื่องใช้สาธารณูปโภคชำรุด
                        </h3>
                        <button 
                            onClick={() => navigate('/report01')} 
                            className="bg-[#433D8B] text-white w-full py-4 rounded-[1rem] font-bold text-lg hover:bg-[#342f6d] transition-all active:scale-95 shadow-md"
                        >
                            แจ้งเครื่องใช้ชำรุด
                        </button>
                    </div>

                    <div className="bg-white rounded-[1.5rem] p-6 mb-4 shadow-sm flex flex-col items-center">
                        <h3 className="text-center font-bold text-gray-900 mb-5 text-[18px]">
                            รับแจ้งเรื่องนอกอาคารและภายในอาคาร
                        </h3>
                        <button 
                            onClick={() => navigate('/report02')}
                            className="bg-[#433D8B] text-white w-full py-4 rounded-[1rem] font-bold text-lg hover:bg-[#342f6d] transition-all active:scale-95 shadow-md"
                        >
                            แจ้งปัญหาทั่วไป
                        </button>
                    </div>

                    <div className="flex justify-end mt-6 w-full">
                        <button onClick={() => navigate('/ai-assist')} className="w-[4.5rem] h-[4.5rem] bg-[#433D8B] rounded-full shadow-xl flex flex-col items-center justify-center hover:bg-[#342f6d] transition-transform hover:scale-110 active:scale-90 z-10">
                            <div className="flex items-end justify-center mb-0.5">
                                <img src="/Group.svg" alt="AI Icon" className="w-8 h-8" />
                            </div>
                            <span className="text-white text-xs font-bold tracking-wider">AI</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;