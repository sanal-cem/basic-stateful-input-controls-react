import React, { useState, useEffect } from "react";
import ControlCard from "./components/ControlCard";
import "./app.css";

function App() {
  const [destroyTrigger, setDestroyTrigger] = useState(false); // initially destroyTrigger is false.

  useEffect(() => {
    // After resetting parameters, destroyTrigger should become false again.
    setDestroyTrigger(false);
  }, [destroyTrigger]);

  return (
    <table className="custom-app-table">
      <tbody>
        <tr>
          <td>
            <h3 className="ms-2">Input Controls Test</h3>
          </td>
        </tr>
        <tr>
          <td>
            <ControlCard
              controlsEnabled={true}
              destroyTrigger={destroyTrigger}
            ></ControlCard>
          </td>
        </tr>
        <tr>
          <td>
            <h3 className="ms-2">Custom Style</h3>
          </td>
        </tr>
        <tr>
          <td>
            <ControlCard
              controlsEnabled={false}
              destroyTrigger={destroyTrigger}
            ></ControlCard>
          </td>
        </tr>
        <tr>
          <td>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => {
                setDestroyTrigger(true);
              }}
            >
              Destroy All
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
