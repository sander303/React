import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import HaldaTooteid from './pages/HaldaTooteid';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';

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
      <Link to="/halda-tooteid">
      <button>Halda tooteid</button>
      </Link>
      <Link to="/poed">
      <button>Poed</button>
      </Link>
      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="ostukorv" element={<Ostukorv /> } />
        <Route path="lisa-toode" element={<LisaToode /> } />
        <Route path="halda-tooteid" element={<HaldaTooteid /> } />
        <Route path="poed" element={<Poed /> } />
      </Routes>
    </div>
  );
}

export default App;
