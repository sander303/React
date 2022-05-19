import { useRef, useState } from "react";

function LisaArvuti() {

    const [s6numKasutajale, m22raS6num] = useState("");
    const markRef = useRef();
    const mudelRef = useRef();
    const maksumusRef = useRef();

    function addProduct() {

        if ((markRef.current.value === "") && (mudelRef.current.value === "") && (maksumusRef.current.value === "")) {
            m22raS6num("Sisestasid tühjuse, ei saanud lisada");
        } else {
            m22raS6num("Toode edukalt lisatud!");
            let margid = [];
            if (localStorage.getItem("margid") !== null) {
                margid = JSON.parse(localStorage.getItem("margid"));
            }
            margid.push(markRef.current.value);
            localStorage.setItem("margid", JSON.stringify(margid));

            let mudelid = [];
            if (localStorage.getItem("mudelid") !== null) {
                mudelid = JSON.parse(localStorage.getItem("mudelid"));
            }
            mudelid.push(mudelRef.current.value);
            localStorage.setItem("mudelid", JSON.stringify(mudelid));

            let maksumused = [];
            if (localStorage.getItem("maksumused") !== null) {
                maksumused = JSON.parse(localStorage.getItem("maksumused"));
            }
            maksumused.push(maksumusRef.current.value);
            localStorage.setItem("maksumused", JSON.stringify(maksumused));
        }
    }

    return (
    <div className="small-text">
        <label>Mark:</label> <br />
        <input ref={markRef} type="text" /> <br />
        <label>Mudel:</label> <br />
        <input ref={mudelRef} type="text" /> <br />
        <label>Maksumus:</label> <br />
        <input ref={maksumusRef} type="number" /> <br />
        <button onClick={() => addProduct()}>Sisesta</button>
        <div>{s6numKasutajale}</div>
    </div>)
}

export default LisaArvuti;