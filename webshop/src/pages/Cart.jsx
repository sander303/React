import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import "../css/cart.css";
import ParcelMachines from "../components/ParcelMachines";
import SmartPostMachines from "../components/SmartPostMachines";
import EveryPay from "../components/EveryPay";
import { sumOfCartService } from '../store/sumOfCartService';

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
        updateCart();
    }

    const increaseQuantity = (productClicked) => {
        const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
        cartProducts[index].quantity = cartProducts[index].quantity + 1;
        updateCart();
    }

    const removeFromCart = (productClicked) => {
        const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
        cartProducts.splice(index, 1);
        if (cartProducts.length === 1 && cartProducts[0].product.id === 11112222) {
           // deleteParcelMachine();
        }
        updateCart();
    }

    const emptyCart = () => {
      //  deleteParcelMachine();
        setCartProducts([]);
        sessionStorage.setItem("cartProducts", JSON.stringify([]));
        sumOfCartService.sendCartSum(0);
    }

    const updateCart = () => {
        setCartProducts(cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        sumOfCartService.sendCartSum(getTotalPrice());
    }

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartProducts.forEach(element => totalPrice += (Number(element.product.price) * element.quantity));
        totalPrice = totalPrice.toFixed(2);
        return totalPrice;
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
                <SmartPostMachines cartProducts={cartProducts} setCProducts={setCartProducts}/>
                <ParcelMachines cartProducts={cartProducts} setCProducts={setCartProducts}/>          
            </div>
            <div className="sideBar">
                <div className="sideBarItems">{t("cart.sum")}</div>
                <div className="sideBarItems">{getTotalPrice()} €</div>
                <EveryPay totalPrice={getTotalPrice}/>
            </div>
        </div>
    );
}

export default Cart;