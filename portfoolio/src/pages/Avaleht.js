import { Link } from "react-router-dom";

function Avaleht() {
 return(<div>
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
 </div>)
}

export default Avaleht;