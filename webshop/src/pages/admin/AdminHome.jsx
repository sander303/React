import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../css/home.css";

function AdminHome() {

    const { t } = useTranslation();

    return (
        <div className="sortButtons">
            <Link to="/admin/halda-poode">
                <Button variant="dark">{t("admin.manage-shops")}</Button>
            </Link>
            <Link to="/admin/lisa-toode">
                <Button variant="dark">{t("admin.add-product")}</Button>
            </Link>
            <Link to="/admin/halda-kategooriaid">
                <Button variant="dark">{t("admin.manage-categories")}</Button>
            </Link>
            <Link to="/admin/halda-tooteid">
                <Button variant="dark">{t("admin.manage-products")}</Button>
            </Link>
        </div>
    );
}

export default AdminHome;