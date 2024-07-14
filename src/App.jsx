import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Certificates from './pages/Certificates/Certificates';
import Provider from './context/Provider';

function App() {
  return (
    <Router>
      <Provider>
      <Routes>
        <Route path="/projects" element={ <Projects /> } />
        <Route path="/certificates" element={ <Certificates /> } />
        <Route exact path="/" element={ <Home /> } />
      </Routes>
      </Provider>
    </Router>
  )
}

export default App;