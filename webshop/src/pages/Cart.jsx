import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "react-bootstrap";
import "../css/cart.css";
import ParcelMachines from "../components/ParcelMachines";

function Cart() {

    const [cartProducts, setCartProducts] = useState(
            JSON.parse(sessionStorage.getItem("cartProducts")) || []);
    const { t } = useTranslation();

    const decreaseQuantity = (productClicked) => {
        const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
        cartProducts[index].quantity = cartProducts[index].quantity - 1;
        if (cartProducts[index].quantity === 0) {
            removeFromCart(productClicked);
        }
        setCartProducts(cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }

    const increaseQuantity = (productClicked) => {
        const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
        cartProducts[index].quantity = cartProducts[index].quantity + 1;
        setCartProducts(cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }

    const removeFromCart = (productClicked) => {
        const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
        cartProducts.splice(index, 1);
        if (cartProducts.length === 1 && cartProducts[0].product.id === 11112222) {
           // deleteParcelMachine();
        }
        setCartProducts(cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        toast.error('Toode eemaldatud!', {
            position: "bottom-right",
            theme: "dark"
            });
    }

    const emptyCart = () => {
      //  deleteParcelMachine();
        setCartProducts([]);
        sessionStorage.setItem("cartProducts", JSON.stringify([]));
        toast.error('Ostukorv tühjendatud!', {
            position: "bottom-right",
            theme: "dark"
            });
    }

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartProducts.forEach(element => totalPrice += (Number(element.product.price) * element.quantity));
        return totalPrice.toFixed(2);
    }

    const everyPay = () => {
        const paymentDetails = {
            "api_username": "92ddcfab96e34a5f",
            "account_name": "EUR3D1",
            "amount": getTotalPrice(),
            "order_reference": Math.floor(Math.random()*899999+100000),
            "nonce": "a9bgt902" + new Date() + Math.floor(Math.random()*899999+100000),
            "timestamp": new Date(),
            "customer_url": "https://react-webshop-1.web.app/"
            }
            fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
                method: "POST",
                body: JSON.stringify(paymentDetails),
                headers: {
                    "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(body => window.location.href = body.payment_link);
    }

    return (
        <div className="container1">
            <div className="containerItems">     
                <div className="d-grid gap-2">  
                    <Button className="emptyCartButton" variant="danger" onClick={() => emptyCart()}>{t("cart.empty ")}</Button>    
                </div>     
                {cartProducts.map(element => 
                <div key={element.product.id} className="cartProduct">
                    <img className="cartProductImg" src={element.product.imgSrc} alt="" />
                    <div className="cartProductName">{element.product.name}</div>
                    <div className="cartProductPrice">{element.product.price} €</div>
                    <div className="cartProductQuantity">
                        { element.product.id !== 11112222 && <img className="cartProductButton" onClick={() => decreaseQuantity(element)} src={require('../assets/minus.png')} alt="" />}
                        <div>{element.quantity} tk</div>
                        { element.product.id !== 11112222 && <img className="cartProductButton" onClick={() => increaseQuantity(element)} src={require('../assets/add.png')} alt="" />}
                    </div>
                    <div className="cartProductTotal">{(element.quantity * element.product.price).toFixed(2)} €</div>
                    { element.product.id !== 11112222 && <img className="cartProductButton" onClick={() => removeFromCart(element)} src={require('../assets/delete.png')} alt="" />}
                    <br />
                </div>
                )}
                <ToastContainer />
                <ParcelMachines cartProducts={cartProducts} setCProducts={setCartProducts}/>
            </div>
            <div className="sideBar">
                <div className="sideBarItems">{t("cart.sum")}</div>
                <div className="sideBarItems">{getTotalPrice()} €</div>
                <Button className="sideBarItems" variant="dark" onClick={() => everyPay()}>{t("cart.pay")}</Button>
            </div>
        </div>
    );
}

export default Cart;