import Login from './Login.jsx';
import Home from './Home.jsx';
import Report01 from './Report01.jsx';
import Report02 from './Report02.jsx'; // นำเข้า Report02
import Submit from './Submit.jsx';
import AiAssist from './AiAssist.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App" style={{ backgroundColor: '#CDBCDB', minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/report01" element={<Report01 />} />
          <Route path="/report02" element={<Report02 />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/ai-assist" element={<AiAssist />} />

        </Routes>
      </Router>
    </div>
  )
}