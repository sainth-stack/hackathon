import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sponsership from './pages/hackathon/sponser';
import Navbar from './pages/hackathon/components/Navbar/Navbar';
import AgiAgents from './pages/agiAgents/AgiAgents';
import AgentHackathon from './pages/hackathon/index'
import DetailPage from './pages/hackathon/components/details/index';
import SubmitPage from './pages/hackathon/components/form/Form';
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<AgiAgents />} />
          <Route path="/agi-agents" element={<AgiAgents />} />
          <Route path="/agi-agents/submit" element={<SubmitPage />} />
          <Route path="/hackathon" element={<AgentHackathon />} />
          <Route path="agnets-hub/details/:id" element={<DetailPage />} />
          agnets-hub/submit{" "}
          <Route path="/sponsorship" element={<Sponsership />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
