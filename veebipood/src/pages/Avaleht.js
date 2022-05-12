// import { useState } from "react";

function Avaleht() {
    const lisatudToode = localStorage.getItem("võti");

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
    return (
    <div>
        Lisatud tooted massiivina: {lisatudToode}
    </div>
    );
}

export default Avaleht;