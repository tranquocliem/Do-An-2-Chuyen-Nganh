import React from "react";

const getStyle = (props) => {
  let baseClass = "alert ";
  if (props.message.msgError) baseClass = baseClass + "alert-danger";
  else baseClass = baseClass + "alert-success";
  return baseClass + " text-center";
};

const Message = (props) => {
  return (
    <div className={getStyle(props)} role="alert">
      {props.message.msgBody}
      {/* <button
        style={{ outline: "none" }}
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button> */}
    </div>
  );
};

export default Message;
