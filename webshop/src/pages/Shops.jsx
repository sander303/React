import { useEffect, useState } from 'react';
import Map from '../components/Map';
		

    function Shops() {
        
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
        <button onClick={() => setCoordinates({lngLat: [59.5378, 24.9574], zoom: 6})}>Kõik poed</button>
        {shops.map(element =>       
            <button onClick={() => setCoordinates({lngLat: [element.latitude, element.longitude], zoom: 13})}>
                {element.name}
            </button>    
            )}
        <Map shopMarkers={shops} mapCoordinaates={coordinaates}  />
        </div>)
    }
    

    export default Shops;
