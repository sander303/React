import { useParams } from "react-router-dom";

function YksikToode() {

    const { nimi } = useParams();

    const tooted = JSON.parse(localStorage.getItem("võti"));

    const leitud = tooted.find(element => element.nimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o") === nimi);

    return (
        <div>
            {leitud && 
            <div>
                <div>{leitud.nimi}</div>
                <div>{leitud.hind}</div>
            </div>}
            {!leitud && <div>Valitud toodet ei leitud</div>}
        </div>
    );
}

export default YksikToode;