import { Link } from "react-router-dom";

function Avaleht() {

    const tegelased = JSON.parse(localStorage.getItem("lisatudTegelased")) || [];
      
    const valiTegelane = (tegelane) => {
        const valitudTegelased = JSON.parse(sessionStorage.getItem("valitudTegelased")) || [];
        valitudTegelased.push(tegelane);
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }
      
    return (
        <div className="content">
        {tegelased.map(tegelane =>
            <div className="tegelane">
                <Link to={"tegelane/" + tegelane.eesNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")
                                      + tegelane.perekonnaNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")}>
                    <div>{tegelane.eesNimi}</div>
                    <div>{tegelane.perekonnaNimi}</div>
                    <div>{tegelane.asukoht}</div>
                    <div>{tegelane.vanus}</div>
                </Link>
                <div><button onClick={() => valiTegelane(tegelane)}>Vali</button></div>
            </div>
            )}      
        </div>
    );
}

export default Avaleht;