import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/home");
    };
    // เก็บค่าแท็บที่เลือกอยู่ (ค่าเริ่มต้นคือ 'Other')
    const [activeTab, setActiveTab] = useState('Other');
    
    // State สำหรับเปิด/ปิดการมองเห็นรหัสผ่าน (ค่าเริ่มต้นคือ false = ปิดรหัส)
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">

            <div className="flex-1 px-4 pt-8 pb-10">
                <div className="bg-[#433D8B] rounded-[2.5rem] p-10 w-full max-w-xl mx-auto shadow-xl min-h-[500px]">

                    {/* สวิตช์สลับ Other/Admin */}
                    <div className="bg-white rounded-full flex w-max mb-8 p-1">
                        <button
                            onClick={() => setActiveTab('Other')}
                            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'Other'
                                ? 'bg-[#7670AC] text-white shadow-sm'
                                : 'text-gray-600 bg-transparent hover:text-black'
                                }`}
                        >Other</button>
                        <button
                            onClick={() => setActiveTab('Admin')}
                            className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'Admin'
                                ? 'bg-[#7670AC] text-white shadow-sm'
                                : 'text-gray-600 bg-transparent hover:text-black'
                                }`}
                        >Admin</button>
                    </div>

                    {/* หัวข้อ Login เปลี่ยนข้อความตามแท็บที่เลือก */}
                    <h2 className="text-center text-5xl font-serif mb-5 text-[#FFB1B1]">
                        {activeTab === 'Admin' ? 'Admin Login' : 'Login'}
                    </h2>
                    <p className="text-center text-sm text-white font-light tracking-widest mb-9">
                        Welcome to LET REPAIR IT! <br></br> 
                        Please enter your University account. <br></br>
                        for guest please use your personal google account. <br></br>
                        
                    </p>

                    <div className="space-y-5">
                        <input
                            type="email"
                            placeholder="Enter E-mail"
                            className="input w-full bg-white text-black placeholder-gray-500 rounded-lg h-12 px-4"
                        />
                        
                        {/* กล่องครอบรหัสผ่าน (ต้องเป็น relative เพื่อให้ไอคอนตาอยู่ขวาสุดได้) */}
                        <div className="relative w-full">
                            <input
                                // เช็คว่าเปิดหรือปิดตาอยู่ ถ้าเปิดให้เป็น text ถ้าปิดให้เป็น password
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="input w-full bg-white text-black placeholder-gray-500 rounded-lg h-12 px-4 pr-12" // เพิ่ม pr-12 เพื่อเว้นที่ให้ไอคอนตา ไม่ให้ตัวหนังสือทับ
                            />
                            
                            {/* ปุ่มไอคอนตา (อยู่ตำแหน่ง absolute ชิดขวา) */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    // ไอคอนตอนเปิดตา (เห็นรหัส)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    // ไอคอนตอนปิดตา (ซ่อนรหัส / มีขีดฆ่า)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button className="btn w-full bg-[#7670AC] border-none hover:bg-[#635d94] text-[#FFB1B1] text-2xl font-serif rounded-2xl h-14 normal-case"  onClick={handleLogin} >
                            Sign in
                        </button>
                    </div>

                    <div className="mt-8">
                        <p className="text-center text-sm text-white font-light tracking-widest">--- or sign in with ---</p>
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                        {/* Google */}
                        <button className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;