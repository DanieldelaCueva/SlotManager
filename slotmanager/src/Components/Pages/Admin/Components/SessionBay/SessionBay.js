import "./SessionBay.css";

const SessionBay = (props) => {
  return (
    <table className="session_bay">
      <thead className="admin-table-thead">
        <tr className="admin-table-tr">
          <th className="admin-table-th">SESSIONS</th>
        </tr>
      </thead>
      <tbody>
        {props.itemList.map((item) => (
          <tr className="session_row admin-table-tr" key={item.room_id}>
            <td onClick={() => {
              props.getUsersBySession(item.room_id)
              props.getSlotsBySession(item.room_id)
            }}>{item.session_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionBay;
