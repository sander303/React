import { useParams } from "react-router-dom";

function YksikTegelane() {

    const { nimi } = useParams();

    const tegelased = JSON.parse(localStorage.getItem("lisatudTegelased"));

    const leitud = tegelased.find(tegelane => tegelane.eesNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")
                                            + tegelane.perekonnaNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o") === nimi);

    return (
        <div className="content">
            {leitud && 
            <div className="tegelane">
                <div>{leitud.eesNimi}</div>
                <div>{leitud.perekonnaNimi}</div>
                <div>{leitud.asukoht}</div>
                <div>{leitud.vanus}</div>
            </div>}
            {!leitud && <div>Valitud tegelast ei leitud</div>}
        </div>
    );
}

export default YksikTegelane;