import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import "../css/home.css";
import SortButtons from "../components/home/SortButtons";
import FilterBar from "../components/home/FilterBar";
import Product from "../components/home/Product";
import CarouselGallery from "../components/home/CarouselGallery"

function Home() {

    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json";
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch(productsUrl)
        .then(res => res.json())
        .then(body => {
            const newArray = [];
            for (const key in body) {  
                const product = body[key];        
                if (product.isActive && product.stock > 0) {
                    newArray.push(body[key]);
                }
            }
            setProducts(newArray);
            setOriginalProducts(newArray);
            let catFromProducts = newArray.map(element => element.category);
            catFromProducts = [...new Set(catFromProducts)];
            setCategories(catFromProducts);
        })
    }, []);
 
    return (
        <div>
            <div>
                <CarouselGallery />
                <FilterBar originalProducts={originalProducts} categories={categories} setProducts={setProducts}/>
                <SortButtons prods={products} setHomeProducts={setProducts}/>
            </div>
            <div className="homeContents">
                {products.map(el => <Product key={el.id} element={el} />)}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;