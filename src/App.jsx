import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Certificates from './pages/Certificates/Certificates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={ <Projects /> } />
        <Route path="/certificates" element={ <Certificates /> } />
        <Route exact path="/" element={ <Home /> } />
      </Routes>
    </Router>
  )
}

export default App;