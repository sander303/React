import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner";

function EditProduct() {

    const { t } = useTranslation();
    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const imgSrcRef = useRef();
    const isActiveRef = useRef();
    const { productId } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json";
    const categoryUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
    const [product, setProduct] = useState();
    const [index, setIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(productsUrl).then(res => res.json())
        .then(body => {
            const productsFromDb = [];
            for (const key in body) {
               productsFromDb.push(body[key]);
            }
            setProducts(productsFromDb);
            const productFound = productsFromDb.find(element => Number(element.id) === Number(productId));
            const productIndex = productsFromDb.indexOf(productFound);
            setIndex(productIndex);
            setProduct(productFound);
        })
    }, [productId]);

    useEffect(() => {
        fetch(categoryUrl).then(res => res.json())
        .then(body => {
            const categoriesFromDb = [];
            for (const key in body) {
                categoriesFromDb.push(body[key]);
            }
            setCategories(categoriesFromDb);
        })
    }, []);

    const changeProduct = () => {
        const changedProduct = {
            id: idRef.current.value,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            price: priceRef.current.value,
            imgSrc: imgSrcRef.current.value,
            isActive: isActiveRef.current.checked
        }
        if (index !== -1) {
            products[index] = changedProduct;

            fetch(productsUrl, {
                method: "PUT",
                body: JSON.stringify(products),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => navigate("/admin/halda-tooteid"))
        }
    }

    const checkIdUniqueness = () => {
        const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
        if (index === -1 || idRef.current.value === product.id) {
            setMessage("");
        } else if (idRef.current.value === "11112222") {
            setMessage("Sisestasid pakiautomaadi ID");
        } else {
            setMessage("Sisestatud ID on mitteunikaalne");
        }
    }

    return (
        <div>
            {product === undefined && <Spinner />}
            {product !== undefined && <div>
            <div>{message}</div>
                 <Form>
                    <Form.Group className="mb-3 d-grid gap-2">
                        <FloatingLabel label="ID" className="mb3">
                            <Form.Control onChange={checkIdUniqueness} ref={idRef} defaultValue={product.id} type="number" placeholder="id" />
                        </FloatingLabel>
                        <FloatingLabel label={t("form.name")} className="mb3">
                            <Form.Control ref={nameRef} defaultValue={product.name} type="text" placeholder="openHrs" />
                        </FloatingLabel>
                        <FloatingLabel label={t("form.description")} className="mb3">
                            <Form.Control ref={descriptionRef} defaultValue={product.description} type="text" placeholder="latitude" />
                        </FloatingLabel>      
                            <Form.Select ref={categoryRef} aria-label="Default select example">
                                <option>{product.category}</option>
                                {categories.map(element => <option key={element.id}>{element.name}</option>)}
                            </Form.Select>        
                        <FloatingLabel label={t("form.price")} className="mb3">
                            <Form.Control ref={priceRef} defaultValue={product.price} type="number" placeholder="price" />
                        </FloatingLabel>
                        <FloatingLabel label={t("form.picture")} className="mb3">
                            <Form.Control ref={imgSrcRef} defaultValue={product.imgSrc} type="text" placeholder="picture" />
                        </FloatingLabel>
                        <Form.Check ref={isActiveRef} defaultValue={product.isActive} type="checkbox" label={t("form.Active")} />
                        <Button disabled={message !== ""} variant="secondary" onClick={() => changeProduct()}>{t("products.edit")}</Button>
                    </Form.Group>    
                </Form>
            </div>
            }
            {product === undefined && <div>Product not found</div>}
        </div>
    );
}

export default EditProduct;