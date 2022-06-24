import SlotRow from "./SlotRow";

import "./SlotTable.css";

import { useEffect } from "react";

const SlotTable = (props) => {
  const updateClearanceState = (callsignToChange) => {
    let prevList = props.flightList;

    let index = 0;

    for (const flight of prevList) {
      if (flight.callsign === callsignToChange) {
        index = prevList.indexOf(flight);
      }
    }

    prevList[index].cleared = !prevList[index].cleared;

    let dataToSend = {
      slot_list: [
        {
          model: "slotstreamer.slot",
          fields: {},
        },
      ],
    };
    dataToSend["slot_list"]["pk"] = prevList[index].callsign;
    dataToSend["slot_list"][0]["fields"]["room_id"] = "test_room";
    dataToSend["slot_list"][0]["fields"]["cleared"] = prevList[index].cleared;
    dataToSend["slot_list"][0]["fields"]["callsign"] = prevList[index].callsign;
    dataToSend["slot_list"][0]["fields"]["type"] = prevList[index].type;
    dataToSend["slot_list"][0]["fields"]["eobt"] = prevList[index].EOBT;
    dataToSend["slot_list"][0]["fields"]["tsat"] = prevList[index].TSAT;
    dataToSend["slot_list"][0]["fields"]["destination"] =
      prevList[index].destination;
    dataToSend["slot_list"][0]["fields"]["ttot"] = prevList[index].TTOT;

    props.slotSocket.send(JSON.stringify(dataToSend));
  };

  useEffect(() => {}, [props.flightList]);

  return (
    <table width="100%" style={{ border: "2px solid #9c9c9c" }}>
      <thead>
        <tr>
          <th>CALLSIGN</th>
          <th>A</th>
          <th>N/TYPE</th>
          <th>EOBT</th>
          <th>TSAT</th>
          <th>DEST</th>
          <th>TTOT</th>
          <th id="atot_h">ATOT</th>
        </tr>
      </thead>
      <tbody>
        {props.flightList.map((flight) => {
          return (
            <SlotRow
              key={flight.callsign}
              callsign={flight.callsign}
              cleared={flight.cleared}
              type={flight.type}
              EOBT={flight.EOBT}
              TSAT={flight.TSAT}
              destination={flight.destination}
              TTOT={flight.TTOT}
              ATOT={flight.ATOT}
              clearanceUpdater={updateClearanceState}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default SlotTable;
