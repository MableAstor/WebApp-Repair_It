import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Report01 from "./Report01.jsx";
import Report02 from "./Report02.jsx";
import Submit from "./Submit.jsx";
import AiAssist from "./AiAssist.jsx";
import Pending from "./Pending.jsx";
import Process from "./Process.jsx";
import Finished from "./Finished.jsx";
import Details from "./Details.jsx";
import ProcessDetails from "./ProcessDetails.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div
      className="App"
      style={{ backgroundColor: "#CDBCDB", minHeight: "100vh" }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/report01" element={<Report01 />} />
          <Route path="/report02" element={<Report02 />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/ai-assist" element={<AiAssist />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/process" element={<Process />} />
          <Route path="/process-details/:id" element={<ProcessDetails />} />
          <Route path="/finished" element={<Finished />} />
        </Routes>
      </Router>
    </div>
  );
}