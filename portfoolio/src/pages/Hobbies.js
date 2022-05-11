import { Link } from "react-router-dom";

function Hobbies() {
    return(
        <div>
            <div>Hobbies</div>
            <Link to="/">
                <button>Tagasi</button>
            </Link>
        </div>
    );
}

export default Hobbies;