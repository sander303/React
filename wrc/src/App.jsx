import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Itinerary from './pages/Itinerary';
import Overall from './pages/Overall';
import Splits from './pages/Splits';
import Stages from './pages/Stages';
import Home from './pages/Home';
import Navigation from './components/Navigation';

function App() {

  return (
    <div>
      <div><Link to="/"><img className="banner" src="wrc-banner.png" alt="" /></Link></div>
      < Navigation />
      <Routes>
        <Route path="" exact element={ <Home /> } />
        <Route path="itinerary" exact element={ <Itinerary /> } />
        <Route path="overall" exact element={ <Overall /> } />
        <Route path="stages" exact element={ <Stages /> } />
        <Route path="splits" exact element={ <Splits /> } />
      </Routes>
    </div>
  );
}

export default App;
