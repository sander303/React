import { Link } from "react-router-dom";

function Courses() {
    return(
        <div>
            <div>Courses</div>
            <Link to="/">
                <button>Tagasi</button>
            </Link>
        </div>
    );
}

export default Courses;