import "./EditBox.css";

import { useRef } from "react";

import { API_ENDPOINT } from "../../../../../config";

const EditBox = props => {
  const slotUrlRef = useRef();

  const userUrlRef = useRef();

  const userUploadHandler = (event) => {
    const url = userUrlRef.current.value;

    if (url === "") {
      alert("Error: empty URL");
    } else {
      fetch(`${API_ENDPOINT}/authentication/user-upload/`, {
        method: "POST",
        body: JSON.stringify({
          room: props.selectedSession,
          user_file_url: url,
        }),
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("userData")).private_token
          }`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            alert("Error: File not found");
          } else if (response.status === 406) {
            alert("Error: File is not .csv");
          }
        })
        .then((data) => {
          userUrlRef.current.value = "";
        });
    }
  };

  const userDeleteHandler = (event) => {
    const url = userUrlRef.current.value;

    if (url === "") {
      alert("Error: empty URL");
    } else {
      fetch(`${API_ENDPOINT}/authentication/user-delete/`, {
        method: "POST",
        body: JSON.stringify({
          user_file_url: url,
        }),
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("userData")).private_token
          }`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            alert("Error: File not found");
          } else if (response.status === 406) {
            alert("Error: File is not .csv");
          }
        })
        .then((data) => {
          userUrlRef.current.value = "";
        });
    }
  };

  const slotUploadHandler = (event) => {
    const url = slotUrlRef.current.value;

    if (url === "") {
      alert("Error: Empty URL");
    } else {
      fetch(`${API_ENDPOINT}/slotstreamer/slot-upload/`, {
        method: "POST",
        body: JSON.stringify({
          room: props.selectedSession,
          slot_file_url: url,
        }),
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("userData")).private_token
          }`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            alert("Error: File not found");
          } else if (response.status === 406) {
            alert("Error: File is not .csv");
          }
        })
        .then((data) => {
          slotUrlRef.current.value = "";
        });
    }
  };

  const slotDeleteHandler = (event) => {
    const url = slotUrlRef.current.value;

    if (url === "") {
      alert("Error: Empty URL");
    } else {
      fetch(`${API_ENDPOINT}/slotstreamer/slot-delete/`, {
        method: "POST",
        body: JSON.stringify({
          room: props.selectedSession,
          slot_file_url: url,
        }),
        headers: {
          Authorization: `Token ${
            JSON.parse(localStorage.getItem("userData")).private_token
          }`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            alert("Error: File not found");
          } else if (response.status === 406) {
            alert("Error: File is not .csv");
          }
        })
        .then((data) => {
          slotUrlRef.current.value = "";
        });
    }
  };

  return (
    <div className="edit_box">
      <div className="header">
        <h4>EDIT SLOTS AND USERS</h4>
        <p>
          Enter the dowload url of a .csv file containing the slots or users you wish to
          edit
        </p>
      </div>

      <form>
        <div className="input-wrapper">
          <label htmlFor="userUrl">User file URL:</label>
          <input id="userUrl" ref={userUrlRef} type="url" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            fill="currentColor"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
            style={{
              margin: "0 0.35rem",
            }}
            onClick={userUploadHandler}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            fill="red"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
            style={{
              margin: "0 0.35rem",
            }}
            onClick={userDeleteHandler}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>

        <div className="input-wrapper">
          <label htmlFor="slotUrl">Slot file URL:</label>
          <input id="slotUrl" ref={slotUrlRef} type="url" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            fill="currentColor"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
            style={{
              margin: "0 0.35rem",
            }}
            onClick={slotUploadHandler}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            fill="red"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
            style={{
              margin: "0 0.35rem",
            }}
            onClick={slotDeleteHandler}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
      </form>
    </div>
  );
};

export default EditBox;
