import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import Courses from './pages/Courses';
import Hobbies from './pages/Hobbies';
import Work from './pages/Work';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={ <Avaleht /> } />
        <Route path="courses" exact element={ <Courses /> } />
        <Route path="hobbies" exact element={ <Hobbies /> } />
        <Route path="work" exact element={ <Work /> } />
      </Routes>
    </div>
  );
}

export default App;
