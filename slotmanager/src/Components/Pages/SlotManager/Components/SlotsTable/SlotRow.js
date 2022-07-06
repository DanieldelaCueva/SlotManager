import "./SlotRow.css"

const SlotRow = props => {
    return(
        <tr>
            <td onClick={props.setSlotEditorFields}>{props.callsign}</td>
            <td><input type="checkbox" className="checkBox" onChange={() => props.clearanceUpdater(props.callsign)} checked={props.cleared}/></td>
            <td>{props.type}</td>
            <td>{props.EOBT}</td>
            <td>{props.TSAT}</td>
            <td>{props.destination}</td>
            <td>{props.TTOT}</td>
            <td>{props.ATOT}</td>
        </tr>
    );
};

export default SlotRow;