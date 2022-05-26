import { useRef, useState } from "react";

function LisaToode() {
    console.log("olen lisa toode lehel");
    // useState
    const [s6numKasutajale, m22raS6num] = useState("");
    const toodeRef = useRef();
    const hindRef = useRef();

    function lisaUusToode() {
        // useRef
        console.log(toodeRef.current.value);
        if (toodeRef.current.value === "" || hindRef.current.value === "") {
            m22raS6num("Sisestasid tühjuse, ei saanud lisada");
        } else if (hindRef.current.value < 0) {
            m22raS6num("Hind ei saa olla negatiivne");
        } else {
            const uusToode = {nimi: toodeRef.current.value, hind: hindRef.current.value}
            fetch("https://test-project-f4bfc-default-rtdb.europe-west1.firebasedatabase.app/tooted.json", {
                method: "POST",
                body: JSON.stringify(uusToode),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            m22raS6num("Toode edukalt lisatud");

            // let tooted = [];
            // if (localStorage.getItem("võti") !== null) {
            //     tooted = JSON.parse(localStorage.getItem("võti"));
            // }
            // tooted.push({nimi: toodeRef.current.value, hind: hindRef.current.value});
            // localStorage.setItem("võti", JSON.stringify(tooted));
        }
    }

    const kontrolliHinnaKorrektsust = () => {
        if (hindRef.current.value < 0) {
            m22raS6num("Hind ei saa olla negatiivne");
        }
    }

    return (
    <div>
        <label>Toote nimi</label><br/>
        <input ref={toodeRef} type="text" /><br/>
        <label>Toote hind</label><br/>
        <input ref={hindRef} onChange={() => kontrolliHinnaKorrektsust()} type="number" /><br/>
        <button onClick={() => lisaUusToode()}>Sisesta</button><br/>
        <div>{s6numKasutajale}</div>
    </div>
    );
}

export default LisaToode;

// SALVESTAMISEKS:
// 1. Andmebaas
// 2. Brauserisse
// 3. Faili