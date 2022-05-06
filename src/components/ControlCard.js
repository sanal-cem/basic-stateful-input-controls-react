import React, { useState } from "react";
import InputControl from "./InputControl/InputControl";

export default function ControlCard(props) {
  const [inputFocusedType, setInputFocusedTypeType] = useState(null);

  return (
    <div style={{ flexDirection: "row" }}>
      <InputControl
        type="NumericInput"
        controlsEnabled={props.controlsEnabled}
        destroyTrigger={props.destroyTrigger}
        inputFocusedType={inputFocusedType}
        setInputFocusedTypeType={setInputFocusedTypeType}
      ></InputControl>
      <InputControl
        type="CalcInput"
        controlsEnabled={props.controlsEnabled}
        destroyTrigger={props.destroyTrigger}
        inputFocusedType={inputFocusedType}
        setInputFocusedTypeType={setInputFocusedTypeType}
      ></InputControl>
    </div>
  );
}
