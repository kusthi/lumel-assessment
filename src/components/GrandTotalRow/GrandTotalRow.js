import "./GrandTotalRow.css";

const GrandTotalRow = ({ grandTotal, grandTotalVariance }) => {
  return (
    <tr className="grand-total-row">
      <td className="label-cell">
        <strong>Grand Total</strong>
      </td>
      <td className="value-cell">
        <strong>{grandTotal.toFixed(2)}</strong>
      </td>
      <td className="input-cell"></td>
      <td className="button-cell"></td>
      <td className="button-cell"></td>
      <td className="variance-cell"></td>
    </tr>
  );
};

export default GrandTotalRow;
