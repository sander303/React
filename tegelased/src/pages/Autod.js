import { useState } from "react";
import { Link } from "react-router-dom";


function Autod() {

    const [ cars ] = useState(JSON.parse(localStorage.getItem("cars")) || []);

    return (
        <div className="content">
            {cars.map(car => 
                <div className="tegelane">
                    <Link to={car.make.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")
                            + car.model.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")}>
                        <div>{car.type}</div>
                        <div>{car.make}</div>
                        <div>{car.model}</div>
                        <div>{car.year}</div>
                    </Link>
                </div>
                )}
        </div>
    );
}

export default Autod;