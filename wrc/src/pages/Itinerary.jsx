import "../css/Itinerary.css";
import moment from "moment-timezone";
import { useEffect, useState } from "react";

function Itinerary() {

    const itineraryUrl = "https://api.wrc.com/results-api/rally-event/1955/itinerary";
    const [itinerary, setItinerary] = useState([]);
    const [stages, setStages] = useState({
        0: [],
        1: [],
        2: [],
        3: []
    });
    const [startTimes, setStartTimes] = useState({
        0: [],
        1: [],
        2: [],
        3: []
    });

    useEffect(() => {
        fetch(itineraryUrl)
        .then(res => res.json())
        .then(body => {
            const thursdayStages = [];
            const fridayStages = [];
            const saturdayStages = [];
            const sundayStages = [];
            const thursdayStartTimes = [];
            const fridayStartTimes = [];
            const saturdayStartTimes = [];
            const sundayStartTimes = [];
            
            body.itineraryLegs[0].itinerarySections.forEach(section => section.stages.forEach(stage => thursdayStages.push(stage)));
            body.itineraryLegs[0].itinerarySections.forEach(section => section.controls.forEach(control => 
                {if (control.type === "StageStart") {thursdayStartTimes.push(control)}}
            ));
            body.itineraryLegs[1].itinerarySections.forEach(section => section.stages.forEach(stage => fridayStages.push(stage)));
            body.itineraryLegs[1].itinerarySections.forEach(section => section.controls.forEach(control => 
                {if (control.type === "StageStart") {fridayStartTimes.push(control)}}
            ));
            body.itineraryLegs[2].itinerarySections.forEach(section => section.stages.forEach(stage => saturdayStages.push(stage)));
            body.itineraryLegs[2].itinerarySections.forEach(section => section.controls.forEach(control => 
                {if (control.type === "StageStart") {saturdayStartTimes.push(control)}}
            ));
            body.itineraryLegs[3].itinerarySections.forEach(section => section.stages.forEach(stage => sundayStages.push(stage)));
            body.itineraryLegs[3].itinerarySections.forEach(section => section.controls.forEach(control => 
                {if (control.type === "StageStart") {sundayStartTimes.push(control)}}
            ));
            setItinerary(body.itineraryLegs);
            setStages({
                0: thursdayStages,
                1: fridayStages,
                2: saturdayStages,
                3: sundayStages
            })
            setStartTimes({
                0: thursdayStartTimes,
                1: fridayStartTimes,
                2: saturdayStartTimes,
                3: sundayStartTimes
            })
        })
    }, []);
  
    return (
        <div className="itinerary">
            {itinerary.map((element, index) => 
            <div key={element.itineraryLegId}>
                <div className="date">
                    {element.name}
                </div>
                <div className="items">
                    <div>
                        {startTimes[index].map(element => 
                        <div className="start-time" key={element.controlId}>
                            {moment.utc(element.firstCarDueDateTime).tz(moment.tz.guess(true)).format('HH:mm')}
                        </div>)}
                    </div>
                    <div>{stages[index].map(stage => 
                        <div className="items" key={stage.stageId}>
                            <div className="stage-code">{stage.code}</div> 
                            <div className="stage-name">{stage.name}</div> 
                            <div className="stage-distance">{stage.distance.toFixed(2)} km</div> 
                            <div className={
                                stage.status === "Completed" ? "stage-status green-text": 
                                stage.status === "Interrupted" ? "stage-status red-text": "stage-status"}>
                                {stage.status}
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>)}
        </div>      
    );
}

export default Itinerary;