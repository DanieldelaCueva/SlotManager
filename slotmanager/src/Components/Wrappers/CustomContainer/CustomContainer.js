import "./CustomContainer.css";

const CustomContainer = (props) => {
  return <div className="mainDiv">{props.children}</div>;
};

export default CustomContainer;
