import { useState } from "react";

function HaldaTooteid() {

    const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("võti")) || []);

    const kustuta = (element) => {
        const jkNumber = tooted.indexOf(element);
        tooted.splice(jkNumber, 1);
        uuendaTooted(tooted.slice());
        localStorage.setItem("võti", JSON.stringify(tooted));
    }

    return (
    <div>
        { tooted.map(element => 
        <div>
            <div>Nimi: {element.nimi}</div>
            <div>Hind: {element.hind}</div>
            <button onClick={() => kustuta(element)}>x</button>
        </div>
        )}       
    </div>
    );
}

export default HaldaTooteid;