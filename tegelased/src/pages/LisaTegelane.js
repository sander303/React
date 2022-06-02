import { useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function LisaTegelane() {

    const { t } = useTranslation();
    const eesnimiRef = useRef();
    const perekonnanimiRef = useRef();
    const asukohtRef = useRef();
    const vanusRef = useRef();
    const [name, setName] = useState();

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
        <Form>
            <Form.Group className="mb-3">
                <FloatingLabel label={t("char.first-name")} className="mb3">
                    <Form.Control ref={eesnimiRef} onChange={(e) => setName(e.target.value)} type="text" placeholder="eesnimi" className="input" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
                <FloatingLabel label={t("char.last-name")} className="mb3">
                    <Form.Control ref={perekonnanimiRef} type="text" placeholder="perekonnanimi" className="input" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
                <FloatingLabel label={t("char.location")} className="mb3">
                    <Form.Control ref={asukohtRef} type="text" placeholder="asukoht" className="input" />
                </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
                <FloatingLabel label={t("char.age")} className="mb3">
                    <Form.Control ref={vanusRef} type="number" placeholder="vanus" className="input" />
                </FloatingLabel>
            </Form.Group> 
            <Button disabled={!name} variant="primary" onClick={() => lisaUusTegelane()}>{t("char.new-char-button")}</Button>
        </Form>
    );
}

export default LisaTegelane;