import { useRef, useState } from "react";

function LisaToode() {
    // useState
    const [s6numKasutajale, m22raS6num] = useState("");
    const toodeRef = useRef();

    function lisaUusToode() {
        // useRef
        console.log(toodeRef.current.value);
        if (toodeRef.current.value === "") {
            m22raS6num("Sisestasid tühjuse, ei saanud lisada");
        } else {
            m22raS6num("Toode edukalt lisatud");
            let tooted = [];
            if (localStorage.getItem("võti") !== null) {
                tooted = JSON.parse(localStorage.getItem("võti"));
            }
            tooted.push(toodeRef.current.value);
            localStorage.setItem("võti", JSON.stringify(tooted));
        }
    }

    return (
    <div>
        <label>Toote nimi</label>
        <input ref={toodeRef} type="text" />
        <button onClick={() => lisaUusToode()}>Sisesta</button>
        <div>{s6numKasutajale}</div>
    </div>
    );
}

export default LisaToode;

// SALVESTAMISEKS:
// 1. Andmebaas
// 2. Brauserisse
// 3. Faili