import "./Admin.css";

import SessionBay from "./Components/SessionBay/SessionBay";

import UserBay from "./Components/UserBay/UserBay";

import LogoutIcon from "./Components/LogoutIcon/LogoutIcon";

import { useState, useEffect } from "react";
import SlotBay from "./Components/SlotBay/SlotBay";
import EditBox from "./Components/EditBox/EditBox";

import { API_ENDPOINT } from "../../../config";

const Admin = () => {
  const [sessionList, setSessionList] = useState([]);

  const [userList, setUserList] = useState([]);

  const [slotList, setSlotList] = useState([]);

  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/slotstreamer/get-sessions`, {
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("userData")).private_token
        }`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setSessionList(data);
      });
  }, []);

  const getUsersBySession = (session_id) => {
    fetch(
      `${API_ENDPOINT}/slotstreamer/get-users-by-session/${session_id}`,
      {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("userData")).private_token
          }`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUserList(data);
      });
  };

  const getSlotsBySession = (session_id) => {
    fetch(
      `${API_ENDPOINT}/slotstreamer/get-slots-by-session/${session_id}`,
      {
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("userData")).private_token
          }`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setSlotList(data);
      });
  };

  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <div className="bay_container">
        <div
          style={{
            width: "30%",
            marginLeft: "10rem",
          }}
        >
          <SessionBay
            itemList={sessionList}
            getUsersBySession={getUsersBySession}
            getSlotsBySession={getSlotsBySession}
            setSelectedSession={setSelectedSession}
          ></SessionBay>
        </div>
        <div
          style={{
            width: "30%",
            marginLeft: "10rem",
          }}
        >
          <UserBay itemList={userList}></UserBay>
        </div>
        <div style={{
          width: '30%',
          marginRight: "10rem",
          marginLeft: "2rem"
        }}>
          <SlotBay itemList={slotList.sort((a,b) => a.ttot.localeCompare(b.ttot))}></SlotBay>
        </div>
      </div>
      <LogoutIcon />
      {selectedSession && <EditBox selectedSession={selectedSession}/>}
    </div>
  );
};

export default Admin;
