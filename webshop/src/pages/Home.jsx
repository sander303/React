import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function Home() {

    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json"
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(productsUrl)
        .then(res => res.json())
        .then(body => {
            const newArray = [];
            for (const key in body) {
                newArray.push(body[key])
            }
            setProducts(newArray);
        })
    }, [])

    // {id: 1238, nimi: "Coca", price: 5}
    const addToCart = (productClicked) => {
        let cProducts = sessionStorage.getItem("cartProducts");
        cProducts = JSON.parse(cProducts) || [];
        const index = cProducts.findIndex(element => element.product.id === productClicked.id);
        if (index >= 0) {
            cProducts[index].quantity = cProducts[index].quantity + 1;
        } else {
            cProducts.push({"product": productClicked, "quantity": 1});
        } 
        cProducts = JSON.stringify(cProducts);
        sessionStorage.setItem("cartProducts", cProducts);
        toast.success('Toode edukalt lisatud!', {
            position: "bottom-right",
            });
    }

    const sortAZ = () => {
        products.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(products.slice());
    }

    const sortZA = () => {
        products.sort((a, b) => b.name.localeCompare(a.name));
        setProducts(products.slice());
    }

    const sortPriceAsc = () => {
        products.sort((a, b) => a.price - b.price);
        setProducts(products.slice());
    }

    const sortPriceDesc = () => {
        products.sort((a, b) => b.price - a.price);
        setProducts(products.slice());
    }

    return (
        <div>
            <button onClick={sortAZ}>Sorteeri A-Z</button>
            <button onClick={sortZA}>Sorteeri Z-A</button>
            <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
            <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
            {products.map(element => 
                <div>
                    <img src={element.imgSrc} alt="" />
                    <div>{element.name}</div>
                    <div>{element.price}</div>
                    <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Home;