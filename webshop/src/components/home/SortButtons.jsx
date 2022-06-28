import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "../../css/home.css";

function SortButtons(props) {

    const { t } = useTranslation();

    const sortAZ = () => {
        props.prods.sort((a, b) => a.name.localeCompare(b.name));
        props.setHomeProducts(props.prods.slice());
    }

    const sortZA = () => {
        props.prods.sort((a, b) => b.name.localeCompare(a.name));
        props.setHomeProducts(props.prods.slice());
    }

    const sortPriceAsc = () => {
        props.prods.sort((a, b) => a.price - b.price);
        props.setHomeProducts(props.prods.slice());
    }

    const sortPriceDesc = () => {
        props.prods.sort((a, b) => b.price - a.price);
        props.setHomeProducts(props.prods.slice());
    }

    return (
        <div className="sortButtons">
            <Button variant="dark" onClick={sortAZ}>{t("sort.AZ")}</Button>
            <Button variant="dark" onClick={sortZA}>{t("sort.ZA")}</Button>
            <Button variant="dark" onClick={sortPriceAsc}>{t("sort.priceAsc")}</Button>
            <Button variant="dark" onClick={sortPriceDesc}>{t("sort.priceDesc")}</Button>
        </div>
    );
}

export default SortButtons;