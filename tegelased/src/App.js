import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Autod from './pages/Autod';
import Avaleht from './pages/Avaleht';
import LisaTegelane from './pages/LisaTegelane';
import ValitudTegelased from './pages/ValitudTegelased';
import YksikAuto from './pages/YksikAuto';
import YksikTegelane from './pages/YksikTegelane';

function App() {

  return (
    <div>
      <NavigationBar />
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
