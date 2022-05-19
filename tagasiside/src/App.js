import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Tagasiside from './pages/Tagasiside';

function App() {
  return (
    <div>
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/tagasiside">
        <button>Tagasiside lehele</button>
      </Link>
      <Routes>
        <Route path="/" exact element={<div>Tere</div>} />
        <Route path="/tagasiside" exact element={ <Tagasiside />} />
      </Routes>
    </div>
  );
}

export default App;
