import { useState } from "react";

import "./RowInput.css";

const RowInput = ({ rowId, onAllocationPercent, onAllocationValue }) => {
  const [inputValue, setInputValue] = useState("");

  const isValidInput = inputValue && inputValue >= 0;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePercentClick = () => {
    const value = parseFloat(inputValue);
    onAllocationPercent(rowId, value);
    setInputValue("");
  };

  const handleValueClick = () => {
    const value = parseFloat(inputValue);
    onAllocationValue(rowId, value);
    setInputValue("");
  };

  return (
    <>
      <td className="input-cell">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="value-input"
          placeholder="Enter value"
        />
      </td>
      <td className="button-cell">
        <button
          onClick={handlePercentClick}
          className="allocation-btn percent-btn"
          disabled={!isValidInput}
        >
          Allocation %
        </button>
      </td>
      <td className="button-cell">
        <button
          onClick={handleValueClick}
          className="allocation-btn value-btn"
          disabled={!isValidInput}
        >
          Allocation Val
        </button>
      </td>
    </>
  );
};

export default RowInput;
