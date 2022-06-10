import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";

function ShopsSettings() {

    const { t } = useTranslation();
    const [shops, setShops] = useState([]);
    const shopRef = useRef();
    const openTimeRef = useRef();
    const latitudeRef = useRef();
    const longitudeRef = useRef();
    const dbUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/shops.json";

    useEffect(() => {
        fetch(dbUrl).then(response => response.json())
        .then(responseBody => {
            const shopsFromDb = [];
            for (const key in responseBody) {
                shopsFromDb.push(responseBody[key]);
            }
            setShops(shopsFromDb);
        });
    }, []);

    const addShop = () => {
        const newShop = {
            name: shopRef.current.value,
            openTime: openTimeRef.current.value,
            latitude: latitudeRef.current.value,
            longitude: longitudeRef.current.value,
        }

        fetch(dbUrl, {
            method: "POST",
            body: JSON.stringify(newShop),
            "headers": {
                "Content-Type": "application/json"
            }
        })

        shops.push(newShop);
        setShops(shops.slice());
        shopRef.current.value = "";
        openTimeRef.current.value = "";
        latitudeRef.current.value = "";
        longitudeRef.current.value = "";
        toast.success("Pood lisatud");
    }

    function deleteShop(shop) {
        const index = shops.findIndex(element => element.name === shop.name);
        shops.splice(index, 1);
        setShops(shops.slice());
        fetch(dbUrl, {
            method: "PUT",
            body: JSON.stringify(shops),
            "headers": {
                "Content-Type": "application/json"
            }
        })
        toast.error("Pood kustutatud");
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3 d-grid gap-2">
                    <FloatingLabel label={t("shops.name")} className="mb3">
                        <Form.Control ref={shopRef} type="text" placeholder="name" />
                    </FloatingLabel>
                    <FloatingLabel label={t("shops.openHrs")} className="mb3">
                        <Form.Control ref={openTimeRef} type="text" placeholder="openHrs" />
                    </FloatingLabel>
                    <FloatingLabel label={t("shops.latitude")} className="mb3">
                        <Form.Control ref={latitudeRef} type="text" placeholder="latitude" />
                    </FloatingLabel>
                    <FloatingLabel label={t("shops.longitude")} className="mb3">
                        <Form.Control ref={longitudeRef} type="text" placeholder="longitude" />
                    </FloatingLabel>
                    <Button variant="secondary" onClick={() => addShop()}>{t("shops.add-btn")}</Button>
                </Form.Group>    
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t("shops.name")}</th>
                        <th>{t("shops.openHrs")}</th>
                        <th>{t("shops.latitude")}</th>
                        <th>{t("shops.longitude")}</th>
                    </tr>
                </thead>
                <tbody>
                    {shops.map(element =>       
                    <tr> 
                        <td>{element.name}</td>	
                        <td>{element.openTime}</td>
                        <td>{element.latitude}</td>
                        <td>{element.longitude}</td>
                        <td className="tableBtn"><Button variant="danger" onClick={() => deleteShop(element)}>X</Button>
                        </td>
                    </tr>
                )}
                </tbody>         
            </Table>
            <ToastContainer />
        </div>
    );
}

export default ShopsSettings;