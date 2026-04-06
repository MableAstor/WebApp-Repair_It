import React from 'react';


const Home = () => {
    return (
        // กำหนดพื้นหลังสีหลักให้เต็มหน้าจอ
        <div className="min-h-screen bg-[#CDBCDB] font-sans flex justify-center">
            
            {/* กล่อง Container หลัก (จำลองขนาดหน้าจอมือถือ) */}
            <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans w-full max-w-md">
                
                {/* พื้นที่เนื้อหาหลัก */}
                <div className="flex-1 px-5 pb-24">
                    
                    {/* คำอธิบายใต้ Header */}
                    <div className="text-center mt-6 mb-4 text-gray-900 font-medium text-[20px]">
                        <p>เว็บแจ้งซ่อมออนไลน์</p>
                        <p>สำหรับบุคลากรและนักศึกษามหาวิทยาลัย</p>
                    </div>

                    {/* กล่องข้อความยินดีต้อนรับ */}
                    <div className="bg-white rounded-[1.5rem] px-4 py-6 mb-6 shadow-sm text-center text-[18px] leading-relaxed text-gray-800 font-medium">
                        <p>
                            ยินดีต้อนรับสู่ระบบแจ้งซ่อมออนไลน์<br />
                            เว็บไซต์นี้จัดทำขึ้นเพื่อเป็นช่องทางกลางให้<br />
                            นักศึกษาและบุคลากรแจ้งซ่อมบำรุงอาคาร<br />
                            สถานที่ได้อย่างรวดเร็วช่วยลดขั้นตอนที่ยุ่งยาก<br />
                            และสามารถติดตามสถานะการดำเนินงานได้ทันที<br />
                            เพื่อสร้างสภาพแวดล้อมที่ดีและปลอดภัย<br />
                            ภายในมหาวิทยาลัยร่วมกัน
                        </p>
                    </div>

                    {/* กล่องแจ้งเครื่องใช้ชำรุด */}
                    <div className="bg-white rounded-[1.5rem] p-6 mb-4 shadow-sm flex flex-col items-center">
                        <h3 className="text-center font-bold text-gray-900 mb-5 text-[20px] leading-snug">
                            รับแจ้งเรื่องเครื่องใช้<br />
                            สาธารณูปโภคชำรุด
                        </h3>
                        <button className="bg-[#433D8B] text-white w-full py-3.5 rounded-[1rem] font-medium text-lg hover:bg-[#342f6d] transition-colors shadow-sm">
                            แจ้งเครื่องใช้ชำรุด
                        </button>
                    </div>

                    {/* กล่องแจ้งปัญหาทั่วไป */}
                    <div className="bg-white rounded-[1.5rem] p-6 mb-4 shadow-sm flex flex-col items-center">
                        <h3 className="text-center font-bold text-gray-900 mb-5 text-[20px] leading-snug">
                            รับแจ้งเรื่องนอกอาคาร<br />
                            และภายในอาคาร
                        </h3>
                        <button className="bg-[#433D8B] text-white w-full py-3.5 rounded-[1rem] font-medium text-lg hover:bg-[#342f6d] transition-colors shadow-sm">
                            แจ้งปัญหาทั่วไป
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;