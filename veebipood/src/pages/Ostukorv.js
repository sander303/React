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

    const arvutaKoguSumma = () => {
        let koguSumma = 0;
        ostukorviEsemed.forEach(element => koguSumma += Number(element.hind));
        return koguSumma;
    }

    const maksma = () => {
        const makseAndmed = {
            "api_username": "92ddcfab96e34a5f",
            "account_name": "EUR3D1",
            "amount": arvutaKoguSumma(),
            "order_reference": Math.floor(Math.random()*899999+100000),
            "nonce": "a9bgt902" + new Date() + Math.floor(Math.random()*899999+100000),
            "timestamp": new Date(),
            "customer_url": "https://testproject456.web.app/"
            }
            fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
                method: "POST",
                body: JSON.stringify(makseAndmed),
                headers: {
                    "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
                    "Content-Type": "application/json"
                }
            }).then(tagastus => tagastus.json())
              .then(sisu => window.location.href = sisu.payment_link);
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
            {ostukorviEsemed.length > 0 && <div>SUMMA KOKKU: {arvutaKoguSumma()} €</div>}
            {ostukorviEsemed.length > 0 && <button onClick={() => maksma()}>MAKSMA</button>}
    </div>
    );
}

export default Ostukorv;