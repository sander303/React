import { Link } from "react-router-dom";

function AdminHome() {
    return (
        <div>
            <Link to="/admin/halda-poode">
                <button>Halda poode</button>
            </Link>
            <Link to="/admin/lisa-toode">
                <button>Lisa toode</button>
            </Link>
            <Link to="/admin/halda-kategooriaid">
                <button>Halda kategooriaid</button>
            </Link>
        </div>
    );
}

export default AdminHome;