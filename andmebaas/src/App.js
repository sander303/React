import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import LisaAndmed from './pages/LisaAndmed';

function App() {

  return (
    <div>
      <Link to="/">
        <button>Avaleht</button>
      </Link>
      <Link to="/lisa-andmeid">
        <button>Lisa Andmeid</button>
      </Link> 
      <Routes>
        <Route path="lisa-andmeid" exact element={ < LisaAndmed /> } />
        <Route path="" exact element={ < Avaleht /> } />
      </Routes>
    </div>
  );
}

export default App;
