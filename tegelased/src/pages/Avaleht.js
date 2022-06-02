import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function Avaleht() {

    const [tegelased, uuendaTegelasi] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetch("https://tegelased-152ea-default-rtdb.europe-west1.firebasedatabase.app/tegelased.json")
        .then(res => res.json())
        .then(data => {
            const tegelasedAndmebaasist = [];
            for (const key in data) {
                tegelasedAndmebaasist.push(data[key]);
            }
            uuendaTegelasi(tegelasedAndmebaasist);
        })
    },[])
      
    const valiTegelane = (tegelane) => {
        const valitudTegelased = JSON.parse(sessionStorage.getItem("valitudTegelased")) || [];
        valitudTegelased.push(tegelane);
        sessionStorage.setItem("valitudTegelased", JSON.stringify(valitudTegelased));
    }
      
    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>{t("char.first-name")}</th>
              <th>{t("char.last-name")}</th>
              <th>{t("char.location")}</th>
              <th>{t("char.age")}</th>
            </tr>
          </thead>
          <tbody>
        {tegelased.map(tegelane =>       
            <tr> 
              <td>
                <Link to={"tegelane/" + tegelane.eesNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")
                                      + tegelane.perekonnaNimi.toLowerCase().replaceAll(" ","-").replaceAll(",", "").replaceAll("õ", "o")}>{tegelased.indexOf(tegelane) + 1}</Link>
              </td>	
              <td>{tegelane.eesNimi}</td>
              <td>{tegelane.perekonnaNimi}</td>
              <td>{tegelane.asukoht}</td>
              <td>{tegelane.vanus}</td>
              <td className="d-grid gap-2"><Button onClick={() => valiTegelane(tegelane)}>{t("char.select-char-button")}</Button></td>
            </tr>
        )}
          </tbody>
        </Table>
        );
}

export default Avaleht;