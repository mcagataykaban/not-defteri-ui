import React from "react";
import './SwitchButton.css'

const SwitchButton = (props) => {
  return (
    <label className="switch text-white">
      <input checked={!props.loginMi} onChange={props.onClick} className="switch-input" type="checkbox" />
      <span
        id="switch-button-sign"
        className="switch-label"
        data-on="Sign-up"
        data-off="Sign-in"
      ></span>
      <span className="switch-handle"></span>
    </label>
  );
};

export default SwitchButton;
