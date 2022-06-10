import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Table } from "react-bootstrap";

function ManageProducts() {

    const { t } = useTranslation();
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

    const deleteProduct = (index) => {
        products.splice(index, 1);
        setProducts(products.slice());
        fetch(productsUrl, {
            method: "PUT",
            body: JSON.stringify(products),
            headers: {
                "Content-Type": "application/json"
            }
        })
        toast.error("Toode kustutatud!", {
            position: "bottom-right",
            theme: "dark"
        });
    }

    return (
        <div>
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
                    {products.map((element, index) =>       
                    <tr> 
                        <td>{element.id}</td>	
                        <td>{element.name}</td>
                        <td>{element.price} €</td>
                        <td>{element.description}</td>
                        <td className="tableBtn"><Link to={"/admin/muuda/" + element.id}><Button variant="secondary">{t("products.edit")}</Button></Link>
                        <Button variant="danger" onClick={() => deleteProduct(index)}>X</Button>
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