
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import LisaArvuti from './pages/LisaArvuti';
import VaataArvuteid from './pages/VaataArvuteid'

function App() {
  
  return (
    <div>
      <Link to="/">
        <button className="btn">Avalehele</button>   
      </Link>
      <Link to="/all">
        <button className="btn">Vaata sülearvuteid</button>
      </Link>
      <Link to="/add">
        <button className="btn">Lisa sülearvuti</button>
      </Link>
      <Routes>
          <Route path="" exact element={ <Avaleht />} />
          <Route path="all" exact element={ <VaataArvuteid /> } />
          <Route path="add" exact element={ <LisaArvuti /> } />
      </Routes>
    </div>
  );
}

export default App;
