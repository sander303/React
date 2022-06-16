import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Table } from "react-bootstrap";

function ManageProducts() {

    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json";
    const searchedProductRef = useRef();
    const [originalProducts, setOriginalProducts] = useState([]);

    useEffect(() => {
        fetch(productsUrl).then(res => res.json())
        .then(body => {
            const productsFromDb = [];
            for (const key in body) {
               productsFromDb.push(body[key]);
            }
            setProducts(productsFromDb);
            setOriginalProducts(productsFromDb);
        })
    }, []);

    const deleteProduct = (productClicked) => {      
        const index =  originalProducts.findIndex(element => element.id === productClicked.id);
        if (index >= 0) {
            originalProducts.splice(index, 1);
        }    
        fetch(productsUrl, {
            method: "PUT",
            body: JSON.stringify(originalProducts),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            setOriginalProducts(originalProducts.slice());
            searchProducts();
        })
        toast.error("Toode kustutatud!", {
            position: "bottom-right",
            theme: "dark"
        });
    }

    const searchProducts = () => {
        const filteredProducts = originalProducts.filter(
            element => element.name.toLowerCase().indexOf(searchedProductRef.current.value.toLowerCase()) >= 0 || 
            element.description.toLowerCase().indexOf(searchedProductRef.current.value.toLowerCase()) >= 0 ||
            element.id.toString().indexOf(searchedProductRef.current.value) >= 0);
        setProducts(filteredProducts);
    }

    return (
        <div>
            <div>
                <input onChange={searchProducts} ref={searchedProductRef} type="text"></input>
                <span>{products.length}</span>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t("form.name")}</th>
                        <th>{t("form.price")}</th>
                        <th>{t("form.description")}</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((element) =>       
                    <tr key={element.id}> 
                        <td>{element.id}</td>	
                        <td>{element.name}</td>
                        <td>{element.price} €</td>
                        <td>{element.description}</td>
                        <td className="tableBtn"><Link to={"/admin/muuda/" + element.id}><Button variant="secondary">{t("products.edit")}</Button></Link>
                        <Button variant="danger" onClick={() => deleteProduct(element)}>X</Button>
                        </td>
                    </tr>
                )}
                </tbody>         
            </Table>
            <ToastContainer />
        </div>
        );
}

export default ManageProducts;