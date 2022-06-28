import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

function Product(props) {

    const { t } = useTranslation();

    const addToCart = (productClicked) => {
        let cProducts = JSON.parse(sessionStorage.getItem("cartProducts")) || [];
        // cProducts = JSON.parse(cProducts) || [];
        const index = cProducts.findIndex(element => element.product.id === productClicked.id);
        if (index >= 0) {
            cProducts[index].quantity = cProducts[index].quantity + 1;
        } else {
            const index = cProducts.findIndex(element => element.product.id === 11112222);
            if (index > 0) {
                cProducts.splice(cProducts.length - 1, 0, {"product": productClicked, "quantity": 1});
            } else {
                cProducts.push({"product": productClicked, "quantity": 1});
            }
            
        } 
        cProducts = JSON.stringify(cProducts);
        sessionStorage.setItem("cartProducts", cProducts);
        toast.success('Toode edukalt lisatud!', {
            position: "bottom-right",
            theme: "dark"
            });
    }

    return (
   
        <div className="productContainer">
            <img className="homeProductPicture" src={props.element.imgSrc} alt="" />
            <div><Link to={"/toode/" + props.element.id}>{props.element.name}</Link></div>
            <div>{props.element.price} €</div>
            <Button variant="light" onClick={() => addToCart(props.element)}>
                {t("shops.add-btn")} <img className="homeCartImage" src={require('../../assets/shopping-cart.png')} alt="" />
            </Button>
        </div>)
}

export default Product;