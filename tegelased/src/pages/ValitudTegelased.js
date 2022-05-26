import { useState } from "react";

function ValitudTegelased() {

    const [valitudTegelased, uuendaTegelasi] = useState(JSON.parse(sessionStorage.getItem("valitudTegelased")) || []);

    const lisaTegelane = (tegelane) => {
        valitudTegelased.push(tegelane);
        uuendaTegelasi(valitudTegelased.slice());
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }

    const kustutaTegelane = (tegelane) => {
        const jkNumber = valitudTegelased.indexOf(tegelane);
        valitudTegelased.splice(jkNumber, 1);
        uuendaTegelasi(valitudTegelased.slice());
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }

    const kustutaK6ik = () => {
        uuendaTegelasi([]);
        sessionStorage.setItem("valitudTegelased", JSON.stringify([]));
    }

    const arvutaKoguVanus = () => {
        let koguVanus = 0;
        valitudTegelased.forEach(tegelane => koguVanus += Number(tegelane.vanus));
        return koguVanus;
    }

    const maksma = () => {
        const makseAndmed = {
            "api_username": "92ddcfab96e34a5f",
            "account_name": "EUR3D1",
            "amount": arvutaKoguVanus(),
            "order_reference": Math.floor(Math.random()*899999+100000),
            "nonce": "a9bgt902" + new Date() + Math.floor(Math.random()*899999+100000),
            "timestamp": new Date(),
            "customer_url": "https://tegelased.web.app/"
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

    return(
        <div>
            <div className="kustuta">
                {valitudTegelased.length > 0 && <button onClick={() => kustutaK6ik()}>Kustuta kõik valitud tegelased</button>}
            </div>
            <div className="content">
                {valitudTegelased.map(tegelane =>
                <div className="tegelane">
                    <div>{tegelane.eesNimi}</div>
                    <div>{tegelane.perekonnaNimi}</div>
                    <div>{tegelane.asukoht}</div>
                    <div>{tegelane.vanus}</div>
                    <button onClick={() => lisaTegelane(tegelane)}>Lisa</button><br />
                    <button onClick={() => kustutaTegelane(tegelane)}>Eemalda</button><br />
                </div>
                )} 
            </div>
            <div className="text">
                {valitudTegelased.length > 0 && <div>Valitud on {valitudTegelased.length} tegelast</div>}
                {valitudTegelased.length === 0 && <div>Ühtegi tegelast pole valitud</div>}
            </div>
            {valitudTegelased.length > 0 && <button onClick={() => maksma()}>MAKSMA</button>}
            {valitudTegelased.length > 0 && <div>Vanused kokku: {arvutaKoguVanus()}</div>}
        </div>
    );
}

export default ValitudTegelased;