import RowInput from "../RowInput/RowInput";
import "./Row.css";

const Row = ({ row, level = 0, onAllocationPercent, onAllocationValue }) => {
  const calculateVariance = (currentValue, originalValue) => {
    if (originalValue === 0) return 0;
    return ((currentValue - originalValue) / originalValue) * 100;
  };

  const variance = calculateVariance(row.value, row.originalValue);
  const indent = level * 20;

  return (
    <tr className="table-row">
      <td className="label-cell" style={{ paddingLeft: `${indent + 16}px` }}>
        {level > 0 && "-- "}
        {row.label}
      </td>
      <td className="value-cell">{row.value.toFixed(2)}</td>
      <RowInput
        rowId={row.id}
        onAllocationPercent={onAllocationPercent}
        onAllocationValue={onAllocationValue}
      />
      <td className="variance-cell">{variance.toFixed(2)}%</td>
    </tr>
  );
};

export default Row;
