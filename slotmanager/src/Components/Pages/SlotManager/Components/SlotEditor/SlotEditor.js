import "./SlotEditor.css";

import { useState, useRef } from "react";

const SlotEditor = (props) => {
  const [showForm, setShowForm] = useState(false);

  const callsignInput = useRef();
  const typeInput = useRef();
  const EOBTInput = useRef();
  const TSATInput = useRef();
  const DESTInput = useRef();
  const TTOTInput = useRef();

  const slotEdit = (event) => {
    event.preventDefault();

    let dataToSend = {
      slot_list: [
        {
          model: "slotstreamer.slot",
          fields: {},
        },
      ],
    };
    dataToSend["slot_list"]["pk"] = callsignInput.current.value.toUpperCase();
    dataToSend["slot_list"][0]["fields"]["room_id"] = JSON.parse(localStorage.getItem("userData")).user_room;
    dataToSend["slot_list"][0]["fields"]["callsign"] =
      callsignInput.current.value.toUpperCase();
    dataToSend["slot_list"][0]["fields"]["type"] = typeInput.current.value.toUpperCase();
    dataToSend["slot_list"][0]["fields"]["eobt"] = EOBTInput.current.value;
    dataToSend["slot_list"][0]["fields"]["tsat"] = TSATInput.current.value;
    dataToSend["slot_list"][0]["fields"]["destination"] =
      DESTInput.current.value.toUpperCase();
    dataToSend["slot_list"][0]["fields"]["ttot"] = TTOTInput.current.value;

    props.slotSocket.send(JSON.stringify(dataToSend));

    callsignInput.current.value = "";
    typeInput.current.value = "";
    EOBTInput.current.value = "";
    TSATInput.current.value = "";
    DESTInput.current.value = "";
    TTOTInput.current.value = "";
  };

  return (
    <form id="slotEditor__form" onSubmit={slotEdit}>
      <p
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        <b>SLOT EDITOR</b>
      </p>{" "}
      {showForm && (
        <div
          style={{
            paddingLeft: "1rem",
            paddingTop: "0.5rem",
            borderLeft: "2px solid #9c9c9c",
            borderRight: "2px solid #9c9c9c",
            borderBottom: "2px solid #9c9c9c",
          }}
        >
          <div className="inputContainer">
            <label htmlFor="callsign" className="inputLabel" style={{marginLeft: "1rem"}}>
              CALLSIGN
            </label>
            <input
              type="text"
              name="callsign"
              minLength="5"
              className="dataInput"
              ref={callsignInput}
              required
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="type" className="inputLabel">
              TYPE
            </label>
            <input
              type="text"
              name="type"
              minLength="4"
              maxLength="4"
              className="dataInput"
              ref={typeInput}
              required
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="EOBT" className="inputLabel">
              EOBT
            </label>
            <input
              type="time"
              name="EOBT"
              className="dataInput"
              ref={EOBTInput}
              required
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="TSAT" className="inputLabel">
              TSAT
            </label>
            <input
              type="time"
              name="TSAT"
              className="dataInput"
              ref={TSATInput}
              required
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="destination" className="inputLabel">
              DEST
            </label>
            <input
              type="text"
              name="destination"
              minLength="4"
              maxLength="4"
              className="dataInput"
              ref={DESTInput}
              required
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="TTOT" className="inputLabel">
              TTOT
            </label>
            <input
              type="time"
              name="TTOT"
              className="dataInput"
              ref={TTOTInput}
              required
            />
          </div>
          <div className="inputContainer">
            <input type="submit" value="SUBMIT" className="dataInput" />
          </div>
        </div>
      )}
    </form>
  );
};

export default SlotEditor;
