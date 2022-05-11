import { Link } from "react-router-dom";

function Work() {
    return(
        <div>
            <div>Work</div>
            <Link to="/">
                <button>Tagasi</button>
            </Link>
        </div>
    );
}

export default Work;