import { useParams } from "react-router-dom";

function YksikAuto() {

    const { auto } = useParams();

    const autod = JSON.parse(localStorage.getItem("cars"));

    const leitud = autod.find(car => car.make.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o") 
                                   + car.model.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o") === auto);

    return (
        <div className="content">
            {leitud && 
            <div className="tegelane">
                <div>{leitud.type}</div>
                <div>{leitud.make}</div>
                <div>{leitud.model}</div>
                <div>{leitud.year}</div>
            </div>}
            {!leitud && <div>Valitud autot ei leitud</div>}
        </div>
    );
}

export default YksikAuto;