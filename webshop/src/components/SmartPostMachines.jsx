import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

function SmartPostMachines(props) {

    const [parcelMachines, setParcelMachines] = useState([]);

    useEffect(() => {
        fetch("https://pakiautomaadid-default-rtdb.europe-west1.firebasedatabase.app/smartpost.json")
        .then(res => res.json())
        .then(body => setParcelMachines(body))
    }, []);

    const addParcelMachine = () => {
        setSelectedPM(SmartPostMachineRef.current.value);
        props.cartProducts.push({product:{id: 11112222, name: "Pakiautomaadi tasu", price: 3.5, imgSrc: require("../assets/locker.png")}, quantity: 1});
        props.setCProducts(props.cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(props.cartProducts));
        sessionStorage.setItem("smartPostMachine", SmartPostMachineRef.current.value);
    }

    const SmartPostMachineRef = useRef();
    const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("smartPostMachine"));

    const deleteParcelMachine = () => {
        setSelectedPM(null);
        props.cartProducts.pop();
        props.setCProducts(props.cartProducts.slice());
        sessionStorage.setItem("cartProducts", JSON.stringify(props.cartProducts));
        sessionStorage.removeItem("smartPostMachine");
    }

    return (
        <div>
            <div className="parcelMachines">
                {selectedPM === null && sessionStorage.getItem("parcelMachine") === null && props.cartProducts.length > 0 &&
                <div className="parcelMachineType">SmartPost: </div>}
                {selectedPM === null && sessionStorage.getItem("parcelMachine") === null && props.cartProducts.length > 0 &&
                <select className="parcelMachineSelect" onChange={addParcelMachine} ref={SmartPostMachineRef}>
                    {parcelMachines.map(element => <option key={element.address}>{element.name}</option>)}
                </select>}
                {selectedPM !== null &&
                <div>{selectedPM} <Button variant="danger" size="sm" onClick={deleteParcelMachine}>X</Button></div>}
            </div>
        </div>
    );
}

export default SmartPostMachines;