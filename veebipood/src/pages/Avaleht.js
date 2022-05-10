import { useState } from "react";

function Avaleht() {
    const [muutuja, funktsioon] = useState("muutuja algväärtus");

    let muutuja2 = "muutuja algväärtus2";

    function funktsioon2() {
        muutuja2 = "uus väärtus";
      }

    return (<div>
        <div>{muutuja}</div>
        <div>{muutuja2}</div>
        <button onClick={() => funktsioon("uus väärtus")} >Muuda muutujat nr1</button>
        <button onClick={() => funktsioon2()}>Muuda muutujat nr2</button>
    </div>);
}

export default Avaleht;