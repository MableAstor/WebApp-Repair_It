import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Other');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert('กรุณากรอกอีเมลและรหัสผ่าน');
            return;
        }

        try {
            setLoading(true);

            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'เข้าสู่ระบบไม่สำเร็จ');
            }

            const data = await res.json();

            localStorage.setItem('user', JSON.stringify(data));

            alert('เข้าสู่ระบบสำเร็จ');
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert(error.message || 'เข้าสู่ระบบไม่สำเร็จ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#CDBCDB] flex flex-col font-sans">

            {/* แสดง Navbar บนหน้า Login */}
            <Navbar title="LET REPAIR IT" />

            <div className="flex-1 px-4 pt-8 pb-10 flex justify-center items-start">
                <div className="bg-[#433D8B] rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl min-h-[550px]">

                    {/* สวิตช์สลับ Other/Admin */}
                    <div className="bg-white rounded-full flex w-max mb-8 p-1 mx-auto lg:mx-0">
                        <button
                            onClick={() => setActiveTab('Other')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'Other'
                                ? 'bg-[#7670AC] text-white shadow-md'
                                : 'text-gray-500 bg-transparent hover:text-black'
                                }`}
                        >Other</button>
                        <button
                            onClick={() => setActiveTab('Admin')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'Admin'
                                ? 'bg-[#7670AC] text-white shadow-md'
                                : 'text-gray-500 bg-transparent hover:text-black'
                                }`}
                        >Admin</button>
                    </div>

                    {/* หัวข้อ Login */}
                    <h2 className="text-center text-5xl font-serif mb-5 text-[#FFB1B1]">
                        {activeTab === 'Admin' ? 'Admin Login' : 'Login'}
                    </h2>

                    {/* คำอธิบายเพิ่มเติม */}
                    <p className="text-center text-[13px] text-white/90 font-light tracking-wide mb-9 leading-relaxed">
                        Welcome to LET REPAIR IT! <br />
                        Please enter your University account. <br />
                        For guest please use your personal google account.
                    </p>

                    <div className="space-y-5">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter E-mail"
                            className="input w-full bg-white text-black placeholder-gray-400 rounded-xl h-12 px-4 focus:ring-2 focus:ring-[#FFB1B1] outline-none"
                        />

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="input w-full bg-white text-black placeholder-gray-400 rounded-xl h-12 px-4 pr-12 focus:ring-2 focus:ring-[#FFB1B1] outline-none"
                            />

                            {/* ปุ่มตาแสดง/ซ่อนรหัสผ่าน */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleLogin}
                            disabled={loading} // กด Login แล้วไปหน้า Home
                            className="btn w-full bg-[#7670AC] border-none hover:bg-[#635d94] text-[#FFB1B1] text-2xl font-serif rounded-2xl h-14 normal-case shadow-lg transition-all active:scale-95"
                        >
                            {loading ? 'กำลังเข้าสู่ระบบ...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="mt-8">
                        <p className="text-center text-[12px] text-white/60 font-light tracking-[0.2em]">--- OR SIGN IN WITH ---</p>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button className="btn bg-white hover:bg-gray-100 text-black border-none px-6 rounded-xl flex items-center gap-3 shadow-md transition-all active:scale-95">
                            <svg width="20" height="20" viewBox="0 0 512 512">
                                <path fill="#fbbc02" d="m90 341a208 200 0 0 1 0-171l63 49q-12 37 0 73" />
                                <path fill="#4285f4" d="m386 400a140 175 0 0 0 53-179H260v74h102q-7 37-38 57" />
                                <path fill="#34a853" d="m153 292c30 82 118 95 171 60h62v48A192 192 0 0 1 90 341" />
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                            </svg>
                            <span className="font-bold">Login with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;