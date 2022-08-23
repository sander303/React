import "../css/Overall.css";
import moment from "moment";
import "moment-duration-format";
import { useEffect, useState } from "react";

function Overall() {

    const [standings, setStandings] = useState([]);
    const [drivers, setDrivers] = useState({
        driverName: [],
        driverId: [],
        driverCountry: []
    });
    const standingsUrl = "https://api.wrc.com/results-api/rally-event/1982/result";
    const driversUrl = "https://api.wrc.com/results-api/rally-event/1982/cars"
    
    useEffect(() => {
        fetch(driversUrl)
        .then(res => res.json())
        .then(body => {
            const driverNames = [];
            const driverCountries = [];
            const driverIds = [];
            body.forEach(element => {
                driverNames.push(element.driver.fullName);
                driverCountries.push(element.driver.country.iso3);
                driverIds.push(element.entryId)
            })
            setDrivers({
                driverName: driverNames,
                driverId: driverIds,
                driverCountry: driverCountries
            })
        })
    }, []);

    useEffect(() => {
    
        fetch(standingsUrl)
        .then(res => res.json())
        .then(body => {
            body.forEach(element=> {
                drivers.driverId.forEach((id, index) => {
                    if (id === element.entryId) {
                        element.name = drivers.driverName[index];
                        element.country = drivers.driverCountry[index];}
                });
            })
            setStandings(body);
        })
    }, [drivers]);

    return (
        <div className="overall">
            {standings.map(element => 
            <div className="standings" key={element.entryId}>
                <div className="overall-position">{element.position}</div>
                <div className="overall-name">{element.name}</div> 
                <div className="overall-country">{element.country}</div> 
                <div className="overall-time">
                    {moment.duration(element.totalTime).format("H:mm:ss.SS")}
                </div>
                <div className="overall-diff-prev">           
                    {element.diffFirstMs > 0 && 
                    <div>+{moment.duration(element.diffPrev).format("H:mm:ss.SS", {trim: "large final", stopTrim: "s"})}</div>}
                </div>
                <div className="overall-diff-first">              
                    {element.diffFirstMs > 0 && 
                    <div>+{moment.duration(element.diffFirst).format("H:mm:ss.SS", {trim: "large final", stopTrim: "s"})}</div>}
                </div>
            </div>)}
        </div>
    );
}

export default Overall;