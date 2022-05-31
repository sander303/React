import { useRef } from "react";

function LisaAndmed() {

    const userIdRef = useRef();
    const idRef = useRef();
    const titleRef = useRef();
    const bodyRef = useRef();

    const LisaUuedAndmed = () => {
        const uuedAndmed = {userId: userIdRef.current.value, id: idRef.current.value, title: titleRef.current.value, body: bodyRef.current.value}
        console.log(uuedAndmed);
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(uuedAndmed),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

return (
    <div>

        <label>UserId</label><br />
        <input ref={userIdRef} type="number"></input><br />
        <label>Id</label><br />
        <input ref={idRef} type="number"></input><br />
        <label>Title</label><br />
        <input ref={titleRef} type="text"></input><br />
        <label>Body</label><br />
        <input ref={bodyRef} type="text"></input><br />
        <button onClick={() => LisaUuedAndmed()}>Saada</button><br />
    </div>
);
}

export default LisaAndmed;