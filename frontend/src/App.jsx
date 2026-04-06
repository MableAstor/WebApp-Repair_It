import Navbar from "./components/Navbar.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <div className="App" style={{ backgroundColor: "#C8ACD6", minHeight: "100vh" }}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
}