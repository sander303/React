import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import Courses from './pages/Courses';
import Hobbies from './pages/Hobbies';
import Work from './pages/Work';

function App() {
  return (
    <div className="App">
      <img src="prog.png" alt="" />
      <div className="rectangle"></div>
      <div className="main-link-list">
        <div className="main-link">
          <Link to="/hobbies">
            <img src="hobbies.png" alt="" />
          </Link>
          <p>Hobbies</p>
        </div>
        <div className="main-link">
          <Link to="/courses">
            <img src="courses.jpg" alt="" />
          </Link>
          <p>Courses</p></div>
        <div className="main-link">
          <Link to="/work">
            <img src="work.jpg" alt="" />
          </Link>
          <p>Work</p></div>
        </div>
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
