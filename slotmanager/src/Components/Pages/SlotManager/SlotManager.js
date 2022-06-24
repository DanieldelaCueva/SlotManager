import Header from "./Components/Header/Header";
import SlotEditor from "./Components/SlotEditor/SlotEditor";
import SlotTable from "./Components/SlotsTable/SlotTable";

import { useState } from 'react';

import "./SlotManager.css"

// const dummyFlights = [
//     {
//       callsign: "RYR62VF",
//       cleared: false,
//       type: "B738",
//       EOBT: "15:00",
//       TSAT: "15:00",
//       destination: "LEZL",
//       TTOT: "15:13",
//       ATOT: "",
//     },
//     {
//       callsign: "VLG234J",
//       cleared: false,
//       type: "A20N",
//       EOBT: "15:00",
//       TSAT: "15:02",
//       destination: "LEZL",
//       TTOT: "15:15",
//       ATOT: "",
//     },
//     {
//       callsign: "MEECNFX",
//       cleared: false,
//       type: "BE20",
//       EOBT: "15:25",
//       TSAT: "15:25",
//       destination: "LEPA",
//       TTOT: "15:18",
//       ATOT: "",
//     },
//     {
//       callsign: "DLH89U",
//       cleared: false,
//       type: "A320",
//       EOBT: "15:50",
//       TSAT: "15:50",
//       destination: "EDDF",
//       TTOT: "16:03",
//       ATOT: "",
//     },
//     {
//       callsign: "BAW481B",
//       cleared: false,
//       type: "A320",
//       EOBT: "16:15",
//       TSAT: "16:18",
//       destination: "EGLL",
//       TTOT: "16:31",
//       ATOT: "",
//     },
//   ];

const storedUser = JSON.parse(localStorage.getItem("user"));

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