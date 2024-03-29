import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import FileUpload from "../../components/FileUpload";

function AddProduct() {

    const idRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const imgSrcRef = useRef();
    const isActiveRef = useRef();
    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json";
    const categoryUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
    const [categories, setCategories] = useState([]);
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [showUrlUpload, setShowUrlUpload] = useState(true);

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
    }, []);

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

    const onAddProduct = () => {

        const newProduct = {
            id: idRef.current.value,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            price: priceRef.current.value,
            imgSrc: imageUrl,
            isActive: isActiveRef.current.checked
        }

        fetch(productsUrl, {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json"
            }
        })
        toast.success(t("addproduct.added"), {
            position: "bottom-right",
            theme: "dark"
        });
    }

    const checkIdUniqueness = () => {
        const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
        if (index === -1) {
            setMessage("");
        } else {
            setMessage("Sisestatud ID on mitteunikaalne");
        }
        if (idRef.current.value === "11112222") {
            setMessage("Sisestasid pakiautomaadi ID");
        }
    }

    const urlRef = useRef();
    const uploadRef = useRef();

    const radioChecked = (clicked) => {
        if (urlRef.current.checked) {
            setShowUrlUpload(true);
        } else {
            setShowUrlUpload(false);
        }
    }

    return (

        <div>
            <div>{message}</div>
            <Form>
                <Form.Group className="mb-3 d-grid gap-2">
                    <FloatingLabel label="ID" className="mb3">
                        <Form.Control onChange={checkIdUniqueness} ref={idRef} type="number" placeholder="id" />
                    </FloatingLabel>
                    <FloatingLabel label={t("form.name")} className="mb3">
                        <Form.Control ref={nameRef} type="text" placeholder="name" />
                    </FloatingLabel>
                    <FloatingLabel label={t("form.description")} className="mb3">
                        <Form.Control ref={descriptionRef} type="text" placeholder="description" />
                    </FloatingLabel>      
                        <Form.Select ref={categoryRef} aria-label="Default select example">
                            <option>{t("form.category")}</option>
                            {categories.map(element => <option key={element.id}>{element.name}</option>)}
                        </Form.Select>        
                    <FloatingLabel label={t("form.price")} className="mb3">
                        <Form.Control ref={priceRef} type="number" placeholder="price" />
                    </FloatingLabel>
                        <Form.Check ref={urlRef} onChange={radioChecked} type="radio" id="url" name="image_source" value="URL" label={t("form.image-as-url")} />
                        <Form.Check ref={uploadRef} onChange={radioChecked} type="radio" id="upload" name="image_source" value="UPLOAD" label={t("form.image-upload")}/>
                        {showUrlUpload === true && <input ref={imgSrcRef} type="text" />}
                        {showUrlUpload === false && <FileUpload onSendPictureUrl={setImageUrl} />}   
                    <Form.Check ref={isActiveRef} type="checkbox" label={t("form.Active")} />
                    <Button disabled={message !== ""} variant="secondary" onClick={() => onAddProduct()}>{t("form.enter")}</Button>
                </Form.Group>    
            </Form>
            <ToastContainer />
        </div>
    );
}

export default AddProduct;