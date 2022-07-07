import Header from "./Components/Header/Header";
import SlotEditor from "./Components/SlotEditor/SlotEditor";
import SlotTable from "./Components/SlotsTable/SlotTable";

import { useState, useContext, useRef } from "react";

import "./SlotManager.css";
import AuthContext from "../../../store/auth-context";

import { WEB_SOCKET_ENDPOINT } from "../../../config";

const storedUser = JSON.parse(localStorage.getItem("userData"));

const slotSocket = new WebSocket(
  `${WEB_SOCKET_ENDPOINT}/slotstreamer/${storedUser ? storedUser.user_room : ""}/${
    storedUser ? storedUser.public_token : ""
  }`
);

const SlotManager = () => {
  const [flightList, setFlightList] = useState([]);

  const authCtx = useContext(AuthContext);

  const callsignInput = useRef();
  const typeInput = useRef();
  const EOBTInput = useRef();
  const TSATInput = useRef();
  const DESTInput = useRef();
  const TTOTInput = useRef();

  slotSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);

    let newFlightList = JSON.parse(data["slot_list"]);

    let updatedFlightList = [];

    for (const flight of newFlightList) {
      updatedFlightList.push({
        callsign: flight.pk,
        cleared: flight.fields.cleared,
        type: flight.fields.type,
        EOBT: flight.fields.eobt.slice(0, 5),
        TSAT: flight.fields.tsat.slice(0, 5),
        destination: flight.fields.destination,
        TTOT: flight.fields.ttot.slice(0, 5),
        ATOT: "",
      });
    }

    if (updatedFlightList !== flightList) {
      setFlightList(updatedFlightList);
    }
  };

  slotSocket.onclose = (e) => {
    authCtx.logout();
  };

  const setSlotEditorFields = (flight) => {
    callsignInput.current.value = flight.callsign;
    typeInput.current.value = flight.type;
    EOBTInput.current.value = flight.EOBT;
    TSATInput.current.value = flight.TSAT;
    DESTInput.current.value = flight.destination;
    TTOTInput.current.value = flight.TTOT;
  };

  return (
    <div id="screen">
      <Header />
      <SlotTable
        flightList={flightList}
        slotSocket={slotSocket}
        setSlotEditorFields={setSlotEditorFields}
      />
      <SlotEditor
        flightList={flightList}
        slotSocket={slotSocket}
        fieldRefs={{
          callsignInput,
          typeInput,
          EOBTInput,
          TSATInput,
          DESTInput,
          TTOTInput,
        }}
      />
    </div>
  );
};

export default SlotManager;
