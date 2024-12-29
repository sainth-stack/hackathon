import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AgentHackathon from './pages/hackathon';
import Sponsership from './pages/hackathon/sponser';
import Navbar from './pages/hackathon/components/Navbar/Navbar';
import AgiAgents from './pages/agiAgents/AgiAgents';
import Hackathon from './pages/hackathon/AgentHackathon/Hackathon';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<AgentHackathon />} />
          <Route path="/agi-agents" element={<AgiAgents />} />

          <Route path="/hackathon" element={<Hackathon />} />

          <Route path="/sponsorship" element={<Sponsership />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
