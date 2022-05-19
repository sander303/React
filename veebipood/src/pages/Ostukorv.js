// 1. map HTML-s
// 2. const muutuja üleval, kust võtan mapi jaoks väärtuseks
// 3. muutuja võtab sessionStorage-st (mis on esialgu tühi)
// 4. lisame sessionStorage-sse ise otse väärtused
// 5. Avalehele ja teeme võimekuse sessionStorage-sse lisada

import { useState } from "react";

function Ostukorv() {
    const [ostukorviEsemed, uuendaOstukorvi] = useState(
        JSON.parse(sessionStorage.getItem("ostukorviTooted")) || []);

    const kustutaOstukorvist = (element) => {
        const jkNumber = ostukorviEsemed.indexOf(element);
        ostukorviEsemed.splice(jkNumber, 1);
        uuendaOstukorvi(ostukorviEsemed.slice());
        sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviEsemed));
    }

    const lisaOstukorvi = (element) => {
        ostukorviEsemed.push(element);
        uuendaOstukorvi(ostukorviEsemed.slice());
        sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviEsemed));
    }

    const tyhjenda = () => {
        uuendaOstukorvi([]);
        sessionStorage.setItem("ostukorviTooted", JSON.stringify([]));
    }

    return (
    <div>
        {ostukorviEsemed.length > 0 && <div>Ostukorvis on {ostukorviEsemed.length} toodet</div>}
        {ostukorviEsemed.length > 0 && <button onClick={() => tyhjenda()}>Tühjenda</button>}
        {ostukorviEsemed.length === 0 && <div>Ostukorv on tühi</div>}
        {ostukorviEsemed.map(element =>
            <div>
                 {element.nimi} ({element.hind} €)
                 <button onClick={() => kustutaOstukorvist(element)}>X</button>
                 <button onClick={() => lisaOstukorvi(element)}>+</button>
            </div>)}
    </div>
    );
}

export default Ostukorv;