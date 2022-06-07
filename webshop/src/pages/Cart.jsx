import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "../css/cart.css";

function Cart() {

    const [cartProducts, setCartProducts] = useState(
            JSON.parse(sessionStorage.getItem("cartProducts")) || []
        );

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
            setCartProducts(cartProducts.slice());
            sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            toast.error('Toode eemaldatud!', {
                position: "bottom-right",
                });
        }

        const emptyCart = () => {
            setCartProducts([]);
            sessionStorage.setItem("cartProducts", JSON.stringify([]));
        }

    return (
        <div>
            <img className="cartProductButton" onClick={() => emptyCart()} src={require('../assets/x-mark.png')} alt="" />
            {cartProducts.map(element => 
            <div key={element.product.id} className="cartProduct">
                <img className="cartProductImg" src={element.product.imgSrc} alt="" />
                <div className="cartProductName">{element.product.name}</div>
                <div className="cartProductPrice">{element.product.price} €</div>
                <div className="cartProductQuantity">
                    <img className="cartProductButton" onClick={() => decreaseQuantity(element)} src={require('../assets/minus.png')} alt="" />
                    <div>{element.quantity} tk</div>
                    <img className="cartProductButton" onClick={() => increaseQuantity(element)} src={require('../assets/add.png')} alt="" />
                </div>
                <div className="cartProductTotal">{element.quantity * element.product.price} €</div>
                <img className="cartProductButton" onClick={() => removeFromCart(element)} src={require('../assets/delete.png')} alt="" />
                <br />
            </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Cart;