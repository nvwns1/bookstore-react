import React from "react";

export default function Alert(props) {
  return (
    <>{props.alert && <div className="alert">{props.alert.message} </div>}</>
  );
}
