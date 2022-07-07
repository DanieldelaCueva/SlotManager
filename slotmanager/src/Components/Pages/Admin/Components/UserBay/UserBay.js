import "./UserBay.css";

const UserBay = (props) => {
  return (
    <table className="user_bay">
      <thead className="admin-table-thead">
        <tr className="admin-table-row">
          <th className="admin-table-th">USERS</th>
        </tr>
      </thead>
      <tbody>
        {props.itemList.map((item) => (
          <tr className="row admin-table-row" key={item.username}>
            <td>{item.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserBay;
