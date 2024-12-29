import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AgentHackathon from './pages/hackathon';
import Sponsership from './pages/hackathon/sponser';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AgentHackathon />} />
          <Route path="/sponsorship" element={<Sponsership />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
