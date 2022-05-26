// import { useState } from "react";
// npm run build
// firebase deploy

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {
    console.log("olen avalehel");
                            //kui siit tuleb tühjus,                siis võta tühi massiiv
    // const lisatudTooted = JSON.parse(localStorage.getItem("võti")) || [];
    const [lisatudTooted, uuendaTooted] = useState([]);

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
    

    // kuvan massiivina kõik tooted välja
    // JSON.parse()
    // .map() --- Reactis massiivi väljakuvamiseks (näitab mingit kindlat HTMLi blokki täpselt nii mitu korda
    //    kui palju on erinevaid elemente massiivi sees)
    // teeme igale tootele nupu ostukorvi lisamiseks

    // nupuvajutusega läheb sessionStorage-sse mingi kindla võtmega ja massiivina
    // Ostukorvi lehe ja seal kuvan ka .map() abil ostukorvi tooteid
    // useState abil muudan ostukorvi sisu silme ees
    // muudan ostukorvi sisu erinevate nuppudega - / +
    // + --- .push()
    // - --- .splice(järjekorranumbri, mitu-tükki)
    // kokkuarvutus mitu toodet mul on: massiivile .length
    function lisaOstukorvi(element) {
    //   const ostukorviTooted = [];
    //    if (sessionStorage.getItem("ostukorviTooted")) {
    //        ostukorviTooted = JSON.parse(sessionStorage.getItem("ostukorviTooted"));
    //    }
        const ostukorviTooted = JSON.parse(sessionStorage.getItem("ostukorviTooted")) || [];
        ostukorviTooted.push(element);
        sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted));
    }

    return (
    <div>
        {lisatudTooted.map(element => 
        <div key={element.nimi}>
            <Link to={"toode/" + element.nimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")}>
                {element.nimi} ({element.hind} €)
            </Link>        
            <button onClick={() => lisaOstukorvi(element)}>Lisa {element.nimi} ostukorvi</button>
        </div>)}
    </div>
    );
}

export default Avaleht;