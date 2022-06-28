import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

function ParcelMachines(props) {

    const [parcelMachines, setParcelMachines] = useState([]);

    useEffect(() => {
        fetch("https://www.omniva.ee/locations.json")
        .then(res => res.json())
        .then(body => setParcelMachines(body))
    }, []);

    const addParcelMachine = () => {
        setSelectedPM(parcelMachineRef.current.value);
        props.cartProducts.push({product:{id: 11112222, name: "Pakiautomaadi tasu", price: 3.5, imgSrc: require("../assets/locker.png")}, quantity: 1});
        props.setCProducts(props.cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(props.cartProducts));
        sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
    }

    const parcelMachineRef = useRef();
    const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("parcelMachine"));

    const deleteParcelMachine = () => {
        setSelectedPM(null);
        props.cartProducts.pop();
        props.setCProducts(props.cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(props.cartProducts));
        sessionStorage.removeItem("parcelMachine");
    }

    return (

        <div className="parcelMachines">
            {selectedPM === null && sessionStorage.getItem("smartPostMachine") === null && props.cartProducts.length > 0 && 
            <div className="parcelMachineType">Omniva: </div>}
            {selectedPM === null && sessionStorage.getItem("smartPostMachine") === null && props.cartProducts.length > 0 &&
            <select className="parcelMachineSelect" onChange={addParcelMachine} ref={parcelMachineRef}>
                {parcelMachines.filter(element => element.A0_NAME === "EE")
                .map(element => <option key={element.ZIP}>{element.NAME}</option>)}
            </select>}
            {selectedPM !== null &&
            <div>{selectedPM} <Button variant="danger" size="sm" onClick={deleteParcelMachine}>X</Button></div>
            }
        </div>
    );
}

export default ParcelMachines;