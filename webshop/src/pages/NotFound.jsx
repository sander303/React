import { useTranslation } from "react-i18next";

function NotFound() {

    const { t } = useTranslation();

    return (
        <div>
            <h2>404</h2>
            <h3>{t("page.notFound")}</h3>
        </div>
    );
}

export default NotFound;