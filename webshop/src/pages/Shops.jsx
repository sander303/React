import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Map from '../components/Map';
import { Button } from "react-bootstrap";
import "../css/home.css";
		

function Shops() {

    const { t } = useTranslation(); 
    const [coordinaates, setCoordinates] = useState({lngLat: [59.5378, 24.9574], zoom: 6});
    const [shops, setShops] = useState([]);
    const dbUrl = "https://react-webshop-9e509-default-rtdb.europe-west1.firebasedatabase.app/shops.json";

    useEffect(() => {
        fetch(dbUrl).then(response => response.json())
        .then(responseBody => {
            const shopsFromDb = [];
            for (const key in responseBody) {
                shopsFromDb.push(responseBody[key]);
            }
            setShops(shopsFromDb);
        })
    }, []);

    return (
    <div>
        <div className="sortButtons">
            <Button variant="dark" onClick={() => setCoordinates({lngLat: [59.5378, 24.9574], zoom: 6})}>{t("shops.all-shops")}</Button>
            {shops.map(element =>       
                <Button variant="dark" onClick={() => setCoordinates({lngLat: [element.latitude, element.longitude], zoom: 13})}>{element.name}</Button> 
            )}
        </div>
    <Map shopMarkers={shops} mapCoordinaates={coordinaates}  />
    </div>)
}


export default Shops;
