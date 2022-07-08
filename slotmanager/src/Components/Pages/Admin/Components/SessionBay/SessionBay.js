import "./SessionBay.css";

import { useRef, useState } from "react";

import { API_ENDPOINT } from "../../../../../config";

const SessionBay = (props) => {
  const [newSessionEditable, setNewSessionEditable] = useState(false);

  const newSessionRef = useRef();

  const newSessionHandler = (e) => {
    if (e.key === "Enter") {
      const newSessionName = newSessionRef.current.value;

      if (newSessionName !== "") {
        fetch(`${API_ENDPOINT}/slotstreamer/create-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${
              JSON.parse(localStorage.getItem("userData")).private_token
            }`,
          },
          body: JSON.stringify({
            session_name: newSessionName,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            props.updateSessionList();
            setNewSessionEditable(false);
            props.setSelectedSession(null);
          });
      }
    }
  };

  const deleteSessionHandler = (room_id) => {
    fetch(`${API_ENDPOINT}/slotstreamer/delete-session`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("userData")).private_token
        }`,
      },
      body: JSON.stringify({
        room_id: room_id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        props.updateSessionList();
        props.setSelectedSession(null);
      });
  };

  return (
    <table className="session_bay">
      <thead className="admin-table-thead">
        <tr className="admin-table-tr">
          <th className="admin-table-th">SESSIONS</th>
        </tr>
      </thead>
      <tbody>
        {props.itemList.map((item) => (
          <tr
            className="session_row admin-table-tr"
            key={item.room_id}
            onDoubleClick={() => deleteSessionHandler(item.room_id)}
          >
            <td
              onClick={() => {
                props.getUsersBySession(item.room_id);
                props.getSlotsBySession(item.room_id);
                props.setSelectedSession(item.room_id);
              }}
            >
              {item.session_name}
            </td>
          </tr>
        ))}
        <tr className="session_row admin-table-tr">
          <td>
            {newSessionEditable && (
              <input
                type="text"
                onKeyDown={newSessionHandler}
                ref={newSessionRef}
              ></input>
            )}
            {!newSessionEditable && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
                onClick={() => setNewSessionEditable(true)}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default SessionBay;
