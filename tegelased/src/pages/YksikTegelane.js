import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function YksikTegelane() {

    const { nimi } = useParams();

    const [tegelased, uuendaTegelasi] = useState([]);

    useEffect(() => {
        fetch("https://tegelased-152ea-default-rtdb.europe-west1.firebasedatabase.app/tegelased.json")
        .then(res => res.json())
        .then(data => {
            const tegelasedAndmebaasist = [];
            for (const key in data) {
                tegelasedAndmebaasist.push(data[key]);
            }
            uuendaTegelasi(tegelasedAndmebaasist);
        })
    },[])

    const leitud = tegelased.find(tegelane => tegelane.eesNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")
                                            + tegelane.perekonnaNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o") === nimi);

    return (
        <div className="content">
            {leitud && 
            <div className="tegelane">
                <div>{leitud.eesNimi}</div>
                <div>{leitud.perekonnaNimi}</div>
                <div>{leitud.asukoht}</div>
                <div>{leitud.vanus}</div>
            </div>}
            {!leitud && <div>Valitud tegelast ei leitud</div>}
        </div>
    );
}

export default YksikTegelane;