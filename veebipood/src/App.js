import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';

function App() {
  return (
    <div className="App">
      <Link to="/">
      <button>Avalehele</button>
      </Link>
      <Link to="/ostukorv">
      <button>Ostukorvi</button>
      </Link>
      <Link to="/lisa-toode">
      <button>Lisa toode</button>
      </Link>
      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="ostukorv" element={<Ostukorv /> } />
        <Route path="lisa-toode" element={<LisaToode /> } />
      </Routes>
    </div>
  );
}

export default App;
