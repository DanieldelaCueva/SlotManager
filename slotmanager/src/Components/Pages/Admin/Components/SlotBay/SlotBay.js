import "./SlotBay.css"

const SlotBay = (props) => {
  return (
    <table className="slot_bay">
      <thead className="admin-table-thead">
        <tr className="admin-table-row">
          <th className="admin-table-th">SLOTS</th>
        </tr>
      </thead>
      <tbody>
        {props.itemList.map((item) => (
          <tr className="row admin-table-row" key={item.callsign}>
            <td>{item.callsign}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SlotBay;
