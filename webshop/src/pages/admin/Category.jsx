import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function Category() {

    const idRef = useRef();
    const nameRef = useRef();
    const categoryUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/categories.json"
    const [categories, setCategories] = useState([]);

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

    return (
        <div>
            <label>ID</label> <br />
            <input ref={idRef} type="text" /> <br />
            <label>Nimi</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <button onClick={addCategory}>Sisesta</button>
            {categories.map((element, index) =>
                <div key={element.id}>
                    <span>{element.name}</span>
                    <button onClick={() => deleteCategory(index)}>X</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Category;