import { useState } from "react";

function Kontakt() {
    const [aadress, määraAadress] = useState("Tallinn");
    const [telefon, määraTelefon] = useState("+372 53 457734");
    const [email, määraEmail] = useState("eestlane123@gmail.com");
    const [ingliseKeelne, määraBoolean] = useState(false);

    function määraUus() {
        määraAadress("London");
        määraTelefon("+44 20 7234 3456");
        määraEmail("englishman123@gmail.com");
        määraBoolean(true);
    }

    return(
        <div>
            <div>{ aadress }</div>
            <div>{ telefon }</div>
            <div>{ email }</div>
            <button onClick={() => määraUus()}>Muuda inglise keelseks</button>
            { ingliseKeelne && <div>Leht on inglise keelne!</div> }
        </div>
    );
}

export default Kontakt;