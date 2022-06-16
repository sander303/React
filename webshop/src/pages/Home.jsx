import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "../css/home.css";
import SortButtons from "../components/SortButtons";
import FilterBar from "../components/FilterBar";

function Home() {

    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetch(productsUrl)
        .then(res => res.json())
        .then(body => {
            const newArray = [];
            for (const key in body) {
                newArray.push(body[key])
            }
            setProducts(newArray);
            setOriginalProducts(newArray);
            let catFromProducts = newArray.map(element => element.category);
            catFromProducts = [...new Set(catFromProducts)];
            setCategories(catFromProducts);
        })
    }, []);

    // {id: 1238, nimi: "Coca", price: 5}
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
        <div>
            <div>
                <FilterBar originalProducts={originalProducts} categories={categories} setProducts={setProducts}/>
                <SortButtons prods={products} setHomeProducts={setProducts}/>
            </div>
            <div className="homeContents">
            {products.map(element => 
                <div className="productContainer" key={element.id}>
                    <img className="homeProductPicture" src={element.imgSrc} alt="" />
                    <div><Link to={"/toode/" + element.id}>{element.name}</Link></div>
                    <div>{element.price} €</div>
                    <Button variant="light" onClick={() => addToCart(element)}>
                        {t("shops.add-btn")} <img className="homeCartImage" src={require('../assets/shopping-cart.png')} alt="" />
                    </Button>
                </div>)}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;