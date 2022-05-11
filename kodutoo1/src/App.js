import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import Kontakt from './pages/Kontakt';
import Meist from './pages/Meist';

function App() {
  return (
    <div className="App">
      <div className="menuu">
        <Link to="/">
        <div>Avaleht</div>
        </Link>
        <Link to="/kontakt">
        <div>Kontakt</div>
        </Link>
        <Link to="/meist">
        <div>Meist</div>
        </Link>
      </div>
      <button className="btn">Kodutoo1</button>
      <p>See on sinine tekst</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg" alt="" />
      <Routes>
      <Route path="/" element={ <Avaleht /> } />
      <Route path="kontakt" element={ <Kontakt /> } />
      <Route path="meist" element={ <Meist /> } />
      </Routes>
    </div>
  );
}

export default App;
