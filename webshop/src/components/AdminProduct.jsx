import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function AdminProduct(props) {

    const { t } = useTranslation();
    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json";

    const deleteProduct = (productClicked) => {      
        const index =  props.originalProducts.findIndex(element => element.id === productClicked.id);
        if (index >= 0) {
            props.originalProducts.splice(index, 1);
        }    
        sendProductsToDb();
        toast.error("Toode kustutatud!", {
            position: "bottom-right",
            theme: "dark"
        });
    }

    const changeProductActive = (productClicked) => {
        const index = props.originalProducts.indexOf(productClicked);
        props.originalProducts[index].isActive = !props.originalProducts[index].isActive;
        sendProductsToDb();
    }

    const decreaseStock = (productClicked) => {
        const index = props.originalProducts.indexOf(productClicked);
        props.originalProducts[index].stock--;
        sendProductsToDb();
    }

    const increaseStock = (productClicked) => {
        const index = props.originalProducts.indexOf(productClicked);
        if (props.originalProducts[index].stock === undefined) {
            props.originalProducts[index].stock = 0;
        }
        props.originalProducts[index].stock++;
        sendProductsToDb();
    }

    const sendProductsToDb = () => {
        fetch(productsUrl, {
            method: "PUT",
            body: JSON.stringify(props.originalProducts),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            props.setOriginalProducts(props.originalProducts.slice());
            props.searchProducts('updated');
        })
    }

    return (
        <tr className={`cartProduct1 ${props.element.isActive ? "active": "inactive"}`}>           
            <td onClick={() => changeProductActive(props.element)}>{props.element.id}</td>	
            <td>{props.element.name}</td>
            <td>{props.element.price} €</td>
            <td>{props.element.description}</td>                      
            {props.element.stock ? <td>{props.element.stock}</td> : <td>0 tk</td>}                       
            <td className="tableBtn">
                <button disabled={!props.element.stock} onClick={() => decreaseStock(props.element)}>-</button>
                <button onClick={() => increaseStock(props.element)}>+</button>
                <Link to={"/admin/muuda/" + props.element.id}><Button variant="secondary">{t("products.edit")}</Button></Link>
                <Button variant="danger" onClick={() => deleteProduct(props.element)}>X</Button>
            </td>
        </tr>
    );
}

export default AdminProduct;