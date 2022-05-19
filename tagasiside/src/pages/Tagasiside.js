import { useState } from "react";

function Tagasiside() {

    const [tagasisided, määraTagasisided] = useState(["Oli hea", "Huvitav", "Teistsugune", "Põnev"]);

    const kustuta = (toode) => {
        const jkNumber = tagasisided.indexOf(toode);
        tagasisided.splice(jkNumber, 1);
        määraTagasisided(tagasisided.slice());
    }

    const tyhjenda = () => {
        määraTagasisided([]);
    }

    return (
    <div>Tagasisided:
        {tagasisided.map(element => 
            <div>
                <span>{element}</span>
                <button onClick={() => kustuta(element)}>X</button>
            </div>)}
        {tagasisided.length > 0 && <button onClick={() => tyhjenda()}>Tühjenda</button>}
        <div>Hetkel on {tagasisided.length} tagasisidet</div>
        {tagasisided.length === 0 && <div>See tekst kuvatakse ainult siis, kui on 0 tagasisidet</div>}
    </div>
    )
}

export default Tagasiside;