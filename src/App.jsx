import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { info } from './info';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
      </Routes>
    </Router>
  )
}

export default App;