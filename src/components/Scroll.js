import React from "react";

const Scroll = (props) => {
  return (
    <div
      className="ba br3 b--white-50 pa3"
      style={{
        overflow: "scroll",
        // border: "3px solid black",
        height: `${props.height}px`,
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
