import "../css/Overall.css";
import moment from "moment";
import "moment-duration-format";
import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";

function Stages() {
    
    const [standings, setStandings] = useState([]);
    const [drivers, setDrivers] = useState({
        driverName: [],
        driverId: [],
        driverCountry: []
    });
    const [stages, setStages] = useState([]);
    const itineraryUrl = "https://api.wrc.com/results-api/rally-event/1982/itinerary";
    const driversUrl = "https://api.wrc.com/results-api/rally-event/1982/cars";
    const [standingsUrl, setStandingsUrl] = useState(`https://api.wrc.com/results-api/rally-event/1982/stage-times/stage-external/3590`);
    
    useEffect(() => {
        fetch(itineraryUrl)
        .then(res => res.json())
        .then(body => {
            const newArray = [];
            body.itineraryLegs.forEach(leg => (leg.itinerarySections.forEach(section => section.controls.forEach(control => {
                if (control.type === "StageStart") {
                    newArray.push(control);}
            }
            ))));
            setStages(newArray);
        })
    }, []);
    
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
            body.forEach(element => {         
                drivers.driverId.forEach((id, index) => {
                    if (id === element.entryId) {
                        element.name = drivers.driverName[index];
                        element.country = drivers.driverCountry[index];
                    }
                });
            })
            setStandings(body);
        })
    }, [drivers, standingsUrl]);

    const changeStage = (id) => {
        setStandingsUrl(`https://api.wrc.com/results-api/rally-event/1982/stage-times/stage-external/${id}`);
    }

    return (
        <div className="overall">
            <div className="stages">
                {stages.map(stage => 
                    <div className="stage" key={stage.controlId}>
                        <Button onClick={() => 
                            changeStage(stage.stageId)} variant={stage.status === "Completed" ? "success":
                            stage.status === "Interrupted" ? "danger": "secondary"} id={stage.stageId}>
                                {stage.code}
                        </Button>
                    </div>
                )}
            </div>
            {standings.map(driver => 
            <div className="standings" key={driver.entryId}>
                <div className="standings-container">
                    <div className="overall-position">{driver.position}</div>
                    <div className="overall-name">{driver.name}</div> 
                    <div className="overall-country">{driver.country}</div> 
                    {driver.elapsedDurationMs > 0 && 
                    <div className="overall-time">
                        {moment.duration(driver.elapsedDurationMs).format("H:mm:ss.SS")}
                    </div>}
                    {driver.diffFirstMs > 0 && 
                    <div className="overall-diff-prev">
                        +{moment.duration(driver.diffPrevMs).format("H:mm:ss.SS", {trim: "large final", stopTrim: "s"})}
                    </div>}
                    {driver.diffFirstMs > 0 && 
                    <div className="overall-diff-first">
                        +{moment.duration(driver.diffFirstMs).format("H:mm:ss.SS", {trim: "large final", stopTrim: "s"})}
                    </div>}
                </div>
                <div>
                    <div className={driver.status === "Completed" ? "overall-status green-text": 
                                    driver.status === "DNS" ? "overall-status red-text": "overall-status"}>
                                        {driver.status}
                    </div> 
                </div>
            </div>
            )}
        </div>
    );
}

export default Stages;