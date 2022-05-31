import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {

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
      
    const valiTegelane = (tegelane) => {
        const valitudTegelased = JSON.parse(sessionStorage.getItem("valitudTegelased")) || [];
        valitudTegelased.push(tegelane);
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }
      
    return (
        <div className="content">
        {tegelased.map(tegelane =>
            <div className="tegelane">
                <Link to={"tegelane/" + tegelane.eesNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")
                                      + tegelane.perekonnaNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")}>
                    <div>{tegelane.eesNimi}</div>
                    <div>{tegelane.perekonnaNimi}</div>
                    <div>{tegelane.asukoht}</div>
                    <div>{tegelane.vanus}</div>
                </Link>
                <div><button onClick={() => valiTegelane(tegelane)}>Vali</button></div>
            </div>
            )}      
        </div>
    );
}

export default Avaleht;