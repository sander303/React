import { useRef, useState } from "react";

function AboutUs() {

    const nameRef = useRef();
    const starsRef = useRef();
    const messageRef = useRef();
    const [starNumber, setStarNumber] = useState(5);

    const sendEmail = () => {
        window.Email.send({
            Host : "smtp.elasticemail.com",
            Username : "sanderkuusik@hotmail.com",
            Password : "994DDF7DF8BB90B09CD0887E83F7DD58977A",
            To : 'jasterway@gmail.com',
            From : "jasterway@gmail.com",
            Subject : "Sulle tuli tagasiside",
            Body : `Sulle kirjutas ${nameRef.current.value}, 
                Tema tagasiside: ${starsRef.current.value} tärni, 
                Sisu: ${messageRef.current.value}`
        }).then(
          message => alert(message)
        );
    }

    const starChanged = () => {
        setStarNumber(starsRef.current.value);
    }

    return (
        <div>
            <label>Sinu nimi</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Mitu tärni meile annad</label> <br />
            <input ref={starsRef} onChange={starChanged} defaultValue="5" type="range" min="1" max="5" /> {starNumber} <br />
            <label>Sinu sõnum</label> <br />
            <input ref={messageRef} type="text" /> <br />
            <button onClick={sendEmail}>Saada e-mail</button>
        </div>
    );
}

export default AboutUs;