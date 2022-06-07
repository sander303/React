import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ValitudTegelased() {

    const { t } = useTranslation();
    const [valitudTegelased, uuendaTegelasi] = useState(JSON.parse(sessionStorage.getItem("valitudTegelased")) || []);

    const suurendaKogust = (lisatavTegelane) => {
        const index = valitudTegelased.findIndex(element => element.tegelane.eesNimi === lisatavTegelane.tegelane.eesNimi);
        valitudTegelased[index].kogus = valitudTegelased[index].kogus + 1;
        uuendaTegelasi(valitudTegelased.slice());
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }

    const v2hendaKogust = (v2hendatavTegelane) => {
        const index = valitudTegelased.findIndex(element => element.tegelane.eesNimi === v2hendatavTegelane.tegelane.eesNimi);
        valitudTegelased[index].kogus = valitudTegelased[index].kogus - 1;
        if (valitudTegelased[index].kogus === 0) {
            kustutaTegelane(v2hendatavTegelane);
        }
        uuendaTegelasi(valitudTegelased.slice());
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }

    const kustutaTegelane = (kustutatavTegelane) => {
        const index = valitudTegelased.findIndex(element => element.tegelane.eesNimi === kustutatavTegelane.tegelane.eesNimi);
        valitudTegelased.splice(index, 1);
        uuendaTegelasi(valitudTegelased.slice());
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }

    const kustutaK6ik = () => {
        uuendaTegelasi([]);
        sessionStorage.setItem("valitudTegelased", JSON.stringify([]));
    }

    const arvutaKoguVanus = () => {
        let koguVanus = 0;
        valitudTegelased.forEach(element => koguVanus += (Number(element.tegelane.vanus) * element.kogus));
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
                {valitudTegelased.length > 0 && <Button variant="danger" onClick={() => kustutaK6ik()}>{t("char.delete-all-button")}</Button>}
            </div>
            <div className="content">
                {valitudTegelased.map(element =>
                <div className="tegelane">
                    <div>{element.tegelane.eesNimi}</div>
                    <div>{element.tegelane.perekonnaNimi}</div>
                    <div>{element.tegelane.asukoht}</div>
                    <div>{element.tegelane.vanus}</div>
                    <div className="kogus">
                        <button onClick={() => suurendaKogust(element)}>+</button>
                        <div>{element.kogus} tk</div>            
                        <button onClick={() => v2hendaKogust(element)}>-</button>
                    </div>
                    <button onClick={() => kustutaTegelane(element)}>{t("char.remove-button")}</button><br />                   
                </div>
                )} 
            </div>
            <div className="text">
                {valitudTegelased.length > 0 && <div>{t("char.selected-chars")}: {valitudTegelased.length}</div>}
                {valitudTegelased.length === 0 && <div>{t("char.no-selected-chars")}</div>}
            </div>
            {valitudTegelased.length > 0 && <div>{t("char.total-age")}: {arvutaKoguVanus()}</div>}
            {valitudTegelased.length > 0 && <button onClick={() => maksma()}>{t("body.pay-button")}</button>}           
        </div>
    );
}

export default ValitudTegelased;