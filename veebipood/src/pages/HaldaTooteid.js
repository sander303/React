import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooteid() {

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

    const kustuta = (element) => {
        const jkNumber = tooted.indexOf(element);
        tooted.splice(jkNumber, 1);
        uuendaTooted(tooted.slice());
        //localStorage.setItem("võti", JSON.stringify(tooted));
        fetch("https://test-project-f4bfc-default-rtdb.europe-west1.firebasedatabase.app/tooted.json", {
                method: "PUT",
                body: JSON.stringify(tooted),
                headers: {
                    "Content-Type": "application/json"
                }
            });
    }

    return (
    <div>
        { tooted.map(element => 
        <div>
            <div>Nimi: {element.nimi}</div>
            <div>Hind: {element.hind}</div>
            <button onClick={() => kustuta(element)}>x</button>
            <Link to={"/muuda/" + element.nimi.toLowerCase().replaceAll(" ", "-")}>
                <button>Muuda</button>
            </Link>
        </div>
        )}       
    </div>
    );
}

export default HaldaTooteid;