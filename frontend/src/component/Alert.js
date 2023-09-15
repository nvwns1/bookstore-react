import React from "react";

export default function Alert(props) {
  return (
    <div style={{ height: "60px" }}>
      {props.alert && <div className="alert">{props.alert.message} </div>}
    </div>
  );
}
