import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

function SelectedProduct() {

    const { t } = useTranslation();
    const { productId } = useParams();
    const [products, setProducts] = useState([]);
    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json";

    useEffect(() => {
        fetch(productsUrl).then(res => res.json())
        .then(body => {
            const productsFromDb = [];
            for (const key in body) {
               productsFromDb.push(body[key]);
            }
            setProducts(productsFromDb);
        })
    }, []);

    const found = products.find(element => JSON.parse(element.id) === JSON.parse(productId));

    return (
        <div>
             {found &&
            <div className="selectedProduct">            
                <div><img className="selectedProductImg" src={found.imgSrc} alt="" /></div>
                <div className="selectedProductInfo">
                    <div>{found.name}</div>           
                    <div>{found.description}</div>
                    <div className="selectedProductPrice">{found.price} €</div>
                </div>
            </div>
            }
            {!found && <div>{t("product.notFound")}</div>}
            <Link to="/"><Button className="backBtn" variant="secondary">{t("selected.backBtn")}</Button></Link>
        </div>
    );
}

export default SelectedProduct;