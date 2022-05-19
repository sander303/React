import { useState } from "react";

function Avaleht() {

    const [keel, muudaKeel] = useState(localStorage.getItem("veebilehe_keel"));

    function eestiKeel() {
        localStorage.setItem("veebilehe_keel", "eesti");
        muudaKeel("eesti");
    }

    function ingliseKeel() {
        localStorage.setItem("veebilehe_keel", "inglise");
        muudaKeel("inglise");
    }

    return (<div className="avaleht-text">  
                {keel === null && <div>Siin lehel saad sülearvuteid vaadata ja lisada < br />
                    <button onClick={() => eestiKeel()}>Eesti keel</button>
                    <button onClick={() => ingliseKeel()}>Inglise keel</button>  
                </div>}
                {keel === "eesti" && <div>Siin lehel saad sülearvuteid vaadata ja lisada < br />
                    <button onClick={() => eestiKeel()}>Eesti keel</button>
                    <button onClick={() => ingliseKeel()}>Inglise keel</button>
                </div>}
                {keel === "inglise" && <div>On this page you can browse and add laptops < br />
                    <button onClick={() => eestiKeel()}>Estonian</button>
                    <button onClick={() => ingliseKeel()}>English</button>
                </div>}             
            </div>
    )
}

export default Avaleht;