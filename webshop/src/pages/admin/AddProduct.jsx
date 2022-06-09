import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";

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

    useEffect(() => {
        fetch(categoryUrl).then(res => res.json())
        .then(body => {
            const newArray = [];
            for (const key in body) {
                newArray.push(body[key]);
            }
            setCategories(newArray);
        })
    }, []);

    const onAddProduct = () => {

        const newProduct = {
            id: idRef.current.value,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            price: priceRef.current.value,
            imgSrc: imgSrcRef.current.value,
            isActive: isActiveRef.current.value
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

    return (

        <div>
            <label>ID</label> <br />
            <input ref={idRef} type="number" /> <br />
            <label>{t("form.name")}</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Kirjeldus</label> <br />
            <input ref={descriptionRef} type="text" /> <br />
            <label>Kategooria</label> <br />
            {/*<input ref={categoryRef} type="text" /> <br />*/}
            <select ref={categoryRef}>
                {categories.map(element => <option key={element.id}>{element.name}</option>)}
            </select> <br />
            <label>Hind</label> <br />
            <input ref={priceRef} type="number" /> <br />
            <label>Pilt</label> <br />
            <input ref={imgSrcRef} type="text" /> <br />
            <label>Aktiivne</label> <br />
            <input ref={isActiveRef} type="checkbox" /> <br />
            <button onClick={onAddProduct}>Sisesta</button>
            <ToastContainer />
        </div>
    );
}

export default AddProduct;