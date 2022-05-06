import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./input-control.css";

export default function InputControl(props) {
  const [value, setValue] = useState(null); // initially value is null
  const [tempValue, setTempValue] = useState(null); // initially tempvalue is null - tempValue is for input element next to Set Value button.
  const [calcResult, setCalcResult] = useState(null); // initially calcResult is null - calcResult is shown inside input-group span elemnent.
  const [isValid, setIsValid] = useState(false); // initially isValid is false
  const [text, setText] = useState(null); // initially text is null
  const [tempText, setTempText] = useState(null); // initially tempText is null - tempText is for input element next to Set Value button.

  useEffect(() => {
    // after destroy button clicked, parameters should be cleared.
    setValue(null);
    setTempValue(null);
    setText(null);
    setIsValid(false);
    setTempText(null);
  }, [props.destroyTrigger]);

  useEffect(() => {
    // valueChanged event
    props.type === "CalcInput" ? calculateInput(value) : checkNumber(value);
  }, [value]);

  const checkNumber = (value) => {
    // used for calculations in NumericInput Container.
    checkIsValid(convertNumericInput(value));
  };

  const convertNumericInput = (value) => {
    // used for calculations in NumericInput Container.
    let convertedNumber = isNaN(value) ? false : value; // isNaN(value) checks if the value is number or not.
    if (!value) convertedNumber = value; // convertedNumber field should include `undefined, null, ""`
    return convertedNumber;
  };

  const calculateInput = (value) => {
    var result = null;
    try {
      // todo: Function içinde injection yapamamalılar.
      if (value) result = new Function("return " + value)();
      checkIsValid(result);
      setCalcResult(result);
    } catch (err) {
      setIsValid(false);
    }
  };

  // isValidChanged event
  const checkIsValid = (number) => {
    if (number || number === null || number === "") setIsValid(true);
    else setIsValid(false);
  };

  const setInputBackgroundColor = () => {
    return {
      boxShadow: "none",
      backgroundColor: props.controlsEnabled ? "#FFFFFF" : "#FFFF92",
    };
  };

  const setChangingInputBorder = () => {
    return {
      border: `3px solid ${
        props.controlsEnabled
          ? isValid
            ? props.inputFocusedType === props.type
              ? "#0000FF"
              : "#BEBEBE"
            : props.inputFocusedType === props.type
            ? "#FF0000"
            : "#FBB0A9"
          : isValid
          ? "#00FF00"
          : "#FF0000"
      }`,
    };
  };

  return (
    <Container fluid className="custom-input-container m-1">
      <Row>
        <Col xs="12">
          <span>{props.type}</span>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <div style={setChangingInputBorder()} className="input-group">
            <input
              type="text"
              style={setInputBackgroundColor()}
              onFocus={() => {
                props.setInputFocusedTypeType(props.type);
              }}
              className="form-control"
              value={value ? value : ""}
              onChange={(e) => {
                setValue(e?.target?.value);
              }}
            />
            {props.type === "CalcInput" && (
              <input
                type="text"
                className="input-group-text result-textbox"
                onChange={() => {}}
                value={isValid ? (calcResult ? calcResult : "") : "?"}
              ></input>
            )}
          </div>
        </Col>
      </Row>
      {props.controlsEnabled && (
        <>
          <Row>
            <Col xs="12">
              <span>
                <b>Value:</b> {value}
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <span>
                <b>Text:</b> {text}
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <span>
                <b>Valid:</b> {isValid.toString()}
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setValue(tempValue);
                  }}
                >
                  Set Value
                </button>
                <input
                  type="text"
                  className="form-control"
                  value={tempValue ? tempValue : ""}
                  onChange={(e) => {
                    // valueChanged event
                    setTempValue(e?.target?.value);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="mt-1">
              <div className="input-group">
                <button
                  style={{ width: "90px" }}
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setText(tempText);
                  }}
                >
                  Set Text
                </button>
                <input
                  type="text"
                  className="form-control"
                  value={tempText ? tempText : ""}
                  onChange={(e) => {
                    // textChanged event
                    setTempText(e?.target?.value);
                  }}
                />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
