import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { Pagination, Table } from "react-bootstrap";
import AdminProduct from "../../components/AdminProduct";

function ManageProducts() {

    const { t } = useTranslation();
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const productsUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/products.json";
    const searchedProductRef = useRef();
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetch(productsUrl).then(res => res.json())
        .then(body => {
            const productsFromDb = [];
            let pagesArray = [];
            let counter = 0;
            for (const key in body) {
               productsFromDb.push(body[key]);
               if (counter%10 === 0) {
                pagesArray.push(counter/10 + 1);
               }
               counter++;
            }
            setPages(pagesArray);
            setFilteredProducts(productsFromDb);
            setDisplayedProducts(productsFromDb.slice(0, 10));
            setOriginalProducts(productsFromDb);
        })
    }, []);

    const searchProducts = (origin) => {
        const filteredProductsArray = originalProducts.filter(
            element => element.name.toLowerCase().indexOf(searchedProductRef.current.value.toLowerCase()) >= 0 || 
            element.description.toLowerCase().indexOf(searchedProductRef.current.value.toLowerCase()) >= 0 ||
            element.id.toString().indexOf(searchedProductRef.current.value) >= 0
        );
        setFilteredProducts(filteredProductsArray)
        let pagesArray = [];
        let counter = 0;
        filteredProductsArray.forEach(element => {
            if (counter%10 === 0) {
                pagesArray.push(counter/10 + 1);
               }
               counter++;
        });
        setPages(pagesArray);
        if (origin === 'updated') {
            setDisplayedProducts(filteredProductsArray.slice((activePage - 1) * 10, activePage * 10));
        } else {
            setActivePage(1);
            setDisplayedProducts(filteredProductsArray.slice(0, 10));
        }    
    }

    const changePage = (number) => {
        setActivePage(number);
        setDisplayedProducts(filteredProducts.slice((number - 1) * 10, number * 10));
    }

    return (
        <div>
            <div>
                <input onChange={() => searchProducts('searched')} ref={searchedProductRef} type="text"></input>
                <span>{filteredProducts.length}</span>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t("form.name")}</th>
                        <th>{t("form.price")}</th>
                        <th>{t("form.description")}</th>
                        <th>Kogus</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedProducts.map(element =>       
                    <AdminProduct 
                        key={element.id}
                        element= {element}
                        originalProducts={originalProducts}
                        setOriginalProducts={setOriginalProducts}
                        searchProducts={searchProducts}
                    />
                )}
                </tbody>         
            </Table>
            <ToastContainer />       
           { pages.length > 1 && <Pagination>{pages.map(number =>
                <Pagination.Item key={number} onClick={() => changePage(number)} active={number === activePage}>
                    {number}
                </Pagination.Item>
                )}
            </Pagination>}         
        </div>
        );
}

export default ManageProducts;