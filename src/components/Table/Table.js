import Rows from "../Rows/Rows";
import GrandTotalRow from "../GrandTotalRow/GrandTotalRow";

import "./Table.css";

const Table = ({ data, onAllocationPercent, onAllocationValue }) => {
  const calculateGrandTotal = () => {
    return data.rows.reduce((total, row) => total + row.value, 0);
  };

  const calculateGrandTotalOriginal = () => {
    return data.rows.reduce((total, row) => total + row.originalValue, 0);
  };

  const calculateVariance = (currentValue, originalValue) => {
    if (originalValue === 0) return 0;
    return ((currentValue - originalValue) / originalValue) * 100;
  };

  const grandTotal = calculateGrandTotal();
  const grandTotalOriginal = calculateGrandTotalOriginal();
  const grandTotalVariance = calculateVariance(grandTotal, grandTotalOriginal);

  return (
    <table className="hierarchical-table">
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        <Rows
          rows={data.rows}
          onAllocationPercent={onAllocationPercent}
          onAllocationValue={onAllocationValue}
        />
        <GrandTotalRow
          grandTotal={grandTotal}
          grandTotalVariance={grandTotalVariance}
        />
      </tbody>
    </table>
  );
};

export default Table;
