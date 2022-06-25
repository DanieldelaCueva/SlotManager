import Header from "./Components/Header/Header";
import SlotEditor from "./Components/SlotEditor/SlotEditor";
import SlotTable from "./Components/SlotsTable/SlotTable";

import { useState } from 'react';

import "./SlotManager.css"

const storedUser = JSON.parse(localStorage.getItem("userData"));

const slotSocket = new WebSocket(
  `ws://127.0.0.1:8000/slotstreamer/${storedUser ? storedUser.user_room : ""}/${storedUser ? storedUser.public_token : ""}`
);

const SlotManager = () => {
    const [flightList, setFlightList] = useState([]);
    
    slotSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
    
      let newFlightList = JSON.parse(data["slot_list"]);
    
      let updatedFlightList = [];
    
      for(const flight of newFlightList){
        updatedFlightList.push({
          callsign: flight.pk,
          cleared: flight.fields.cleared,
          type: flight.fields.type,
          EOBT: flight.fields.eobt.slice(0, 5),
          TSAT: flight.fields.tsat.slice(0, 5),
          destination: flight.fields.destination,
          TTOT: flight.fields.ttot.slice(0, 5),
          ATOT: ""
        });
      }
    
      if(updatedFlightList !== flightList){
        setFlightList(updatedFlightList);
      }
    };

    return(
        <div id="screen">
            <Header/>
            <SlotTable flightList={flightList} slotSocket={slotSocket}/>
            <SlotEditor flightList={flightList} slotSocket={slotSocket}/>
        </div>
    );
}

export default SlotManager;