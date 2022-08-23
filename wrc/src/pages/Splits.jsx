import "../css/Overall.css";
import "../css/Splits.css";
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import moment from "moment";
import "moment-duration-format";

function Splits() {

    const [splitPoints, setSplitPoints] = useState([]);
    const [driverSplits, setDriverSplits] = useState([]);
    const [stages, setStages] = useState([]);
    const [drivers, setDrivers] = useState({
        driverName: [],
        driverId: []
    });
    const [fastestSplits, setFastestSplits] = useState({});
    const itineraryUrl = "https://api.wrc.com/results-api/rally-event/1982/itinerary";
    const driversUrl = "https://api.wrc.com/results-api/rally-event/1982/cars";
    const [splitsUrl, setSplitsUrl] = useState(`https://api.wrc.com/results-api/rally-event/1982/split-times/stage-external/3590`);

    useEffect(() => {
        fetch(driversUrl)
        .then(res => res.json())
        .then(body => {
            const driverNames = [];
            const driverIds = [];
            body.forEach(element => {
                driverNames.push(element.driver.code);
                driverIds.push(element.entryId);
            })
            setDrivers({
                driverName: driverNames,
                driverId: driverIds
            })
        })
    }, []);

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
        fetch(splitsUrl)
        .then(res => res.json())
        .then(body => {
            body.entrySplitPointTimes.forEach(element => {         
                drivers.driverId.forEach((id, index) => {
                    if (id === element.entryId) {
                        element.name = drivers.driverName[index];
                    }
                });
            })
            setDriverSplits(body.entrySplitPointTimes);
            const newArray = body.splitPoints;
            newArray.sort((a, b) => a.number - b.number);
            setSplitPoints(newArray);    
            const splitsObj = {};
            body.entrySplitPointTimes.forEach(element => element.splitPointTimes.forEach(split => {
                if (!splitsObj[split.splitPointId]) {
                    splitsObj[split.splitPointId] = [];
                }   
                splitsObj[split.splitPointId].push(split.elapsedDurationMs);
            }));
            for (const key in splitsObj) {
                splitsObj[key] = Math.min(...splitsObj[key]);
            }
            setFastestSplits(splitsObj);
        })                   
    }, [drivers, splitsUrl]);

    const changeStage = (id) => {
        setSplitsUrl(`https://api.wrc.com/results-api/rally-event/1982/split-times/stage-external/${id}`);
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
            <div className="splits-table">
                <div>
                    <div className="splits">
                        {driverSplits.length > 0 && <div>Driver</div>}
                        {splitPoints.map(splitPoint => 
                            <div className="individual-split" key={splitPoint.splitPointId}>
                                {splitPoint.number}. ({splitPoint.distance} km)
                            </div>
                        )}
                    </div>
                    <div >
                        {driverSplits.map(driver => 
                            <div key={driver.entryId} className="driver-splits">
                                <div className="driver-name">
                                    {driver.name}
                                </div> 
                                {driver.splitPointTimes.map(element => 
                                    <div key={element.splitPointTimeId} className={element.elapsedDurationMs === fastestSplits[element.splitPointId] ? 
                                    "green-text bold-text individual-driver-split": "red-text individual-driver-split"}>
                                        +{moment.duration(element.elapsedDurationMs - fastestSplits[element.splitPointId])
                                        .format("H:mm:ss.SS", {trim: "large final", stopTrim: "s"})}
                                      
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {driverSplits.length > 0 && <div className="stage-end">Stage end</div>}
                    {driverSplits.map(driver => 
                        <div key={driver.entryId} className="stage-end-time">
                            {moment.duration(driver.stageTimeDurationMs).format("H:mm:ss.SS", {trim: "large final", stopTrim: "s"})}
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
}

export default Splits;