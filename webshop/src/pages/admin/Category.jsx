import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { Button, Dropdown, DropdownButton, FloatingLabel, Form } from "react-bootstrap";

function Category() {

    const idRef = useRef();
    const nameRef = useRef();
    const categoryUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/categories.json"
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const { t } = useTranslation();

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

    const addCategory = () => {
        const newCategory = {
            id: idRef.current.value,
            name: nameRef.current.value
        }
        fetch(categoryUrl, {
            method: "POST",
            body: JSON.stringify(newCategory),
            headers: {
                "Content-Type": "application/json"
            }
        })
        toast.success("Uus kategooria edukalt lisatud!", {
            position: "bottom-right",
            theme: "dark"
        });
    }

    const deleteCategory = (index) => {
        categories.splice(index, 1);
        setCategories(categories.slice());
        fetch(categoryUrl, {
            method: "PUT",
            body: JSON.stringify(categories),
            headers: {
                "Content-Type": "application/json"
            }
        })
        toast.error("Kategooria kustutatud!", {
            position: "bottom-right",
            theme: "dark"
        });
    }

    const checkIdUniqueness = () => {
        const index = categories.findIndex(element => Number(element.id) === Number(idRef.current.value));
        if (index === -1) {
            setMessage("");
        } else {
            setMessage("Sisestatud ID on mitteunikaalne");
        }
        if (idRef.current.value === "11112222") {
            setMessage("Sisestasid pakiautomaadi ID");
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
                    <FloatingLabel label={t("category.name")} className="mb3">
                        <Form.Control ref={nameRef} type="text" placeholder="name" />
                    </FloatingLabel>
                    <Button disabled={message !== ""} variant="secondary" onClick={() => addCategory()}>{t("category.enter")}</Button>
                </Form.Group> 
            </Form>
            <DropdownButton id="dropdown-basic-button" title={t("category.added-categories")} variant="dark">
                {categories.map((element, index) =>
                    <Dropdown.Item className="dropDownItem" key={element.id}>
                        {element.name}
                        <Button size="sm" variant="danger" onClick={() => deleteCategory(index)}>X</Button>
                    </Dropdown.Item>
                )}
            </DropdownButton>
            <ToastContainer />
        </div>
    );
}

export default Category;