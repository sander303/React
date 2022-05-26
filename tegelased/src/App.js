import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Autod from './pages/Autod';
import Avaleht from './pages/Avaleht';
import LisaTegelane from './pages/LisaTegelane';
import ValitudTegelased from './pages/ValitudTegelased';
import YksikAuto from './pages/YksikAuto';
import YksikTegelane from './pages/YksikTegelane';

function App() {

  return (
    <div>
      <Link to="/">
        <button>Avaleht</button>
      </Link>
      <Link to="/valitud-tegelased">
        <button>Valitud Tegelased</button>
      </Link>
      <Link to="/lisa-tegelane">
        <button>Lisa Tegelane</button>
      </Link>
      <Link to="/autod">
        <button>Autod</button>
      </Link>
      <Routes>
        <Route path="" exact element={ <Avaleht /> } />
        <Route path="valitud-tegelased" exact element={ <ValitudTegelased /> } />
        <Route path="lisa-tegelane" exact element={ <LisaTegelane /> } />
        <Route path="tegelane/:nimi" exact element={ <YksikTegelane /> } />
        <Route path="autod" exact element={ <Autod /> } />
        <Route path="autod/:auto" exact element={ <YksikAuto /> } />
      </Routes>
    </div>
  );
}

export default App;
