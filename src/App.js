import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sponsership from './pages/hackathon/sponser';
import Navbar from './pages/hackathon/components/Navbar/Navbar';
import AgiAgents from './pages/agiAgents/AgiAgents';
import AgentHackathon from './pages/hackathon/index'
import DetailPage from './pages/hackathon/components/details/index';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<AgentHackathon />} />
          <Route path="/agi-agents" element={<AgiAgents />} />
          <Route path="/hackathon" element={<AgentHackathon />} />
          <Route path="agnets-hub/details/:id" element={<DetailPage />} />

          <Route path="/sponsorship" element={<Sponsership />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
