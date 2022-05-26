import { useRef } from "react";

function LisaTegelane() {

    const eesnimiRef = useRef();
    const perekonnanimiRef = useRef();
    const asukohtRef = useRef();
    const vanusRef = useRef();

    const lisaUusTegelane = () => {
        let tegelased = [];
            if (localStorage.getItem("lisatudTegelased") !== null) {
                tegelased = JSON.parse(localStorage.getItem("lisatudTegelased"));
            }
            tegelased.push({
                eesNimi: eesnimiRef.current.value,
                perekonnaNimi: perekonnanimiRef.current.value,
                asukoht: asukohtRef.current.value,
                vanus: vanusRef.current.value});
            localStorage.setItem("lisatudTegelased", JSON.stringify(tegelased));
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