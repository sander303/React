import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function YksikToode() {

    const { nimi } = useParams();

    const [tooted, uuendaTooted] = useState([]);

    useEffect(()=>{
        fetch("https://test-project-f4bfc-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
        .then(tagastus => tagastus.json())
        .then(object => {
            const tootedAndmebaasist = [];
            for (const key in object) {
                tootedAndmebaasist.push(object[key])
            }
            console.log(tootedAndmebaasist);
            uuendaTooted(tootedAndmebaasist);
        })
    },[]);

    const leitud = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o") === nimi);

    return (
        <div>
            {leitud && 
            <div>
                <div>{leitud.nimi}</div>
                <div>{leitud.hind}</div>
            </div>}
            {!leitud && <div>Valitud toodet ei leitud</div>}
        </div>
    );
}

export default YksikToode;