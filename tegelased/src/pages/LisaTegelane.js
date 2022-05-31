import { useRef } from "react";

function LisaTegelane() {

    const eesnimiRef = useRef();
    const perekonnanimiRef = useRef();
    const asukohtRef = useRef();
    const vanusRef = useRef();

    const lisaUusTegelane = () => {
        const uusTegelane = {eesNimi: eesnimiRef.current.value, perekonnaNimi: perekonnanimiRef.current.value,
        asukoht: asukohtRef.current.value, vanus: vanusRef.current.value}
        fetch("https://tegelased-152ea-default-rtdb.europe-west1.firebasedatabase.app/tegelased.json", {
            method: "POST",
            body: JSON.stringify(uusTegelane),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div>
            <label>Eesnimi:</label><br/>
            <input ref={eesnimiRef} type="text" /><br/>
            <label>Perekonnanimi:</label><br/>
            <input ref={perekonnanimiRef} type="text" /><br/>
            <label>Asukoht:</label><br/>
            <input ref={asukohtRef} type="text" /><br/>
            <label>Vanus:</label><br/>
            <input ref={vanusRef} type="number" /><br/>
            <button onClick={() => lisaUusTegelane()}>Sisesta</button><br/>
        </div>
    );
}

export default LisaTegelane;