import Row from "../Row/Row";

const Rows = ({ rows, level = 0, onAllocationPercent, onAllocationValue }) => {
  const renderRows = (rowsData, currentLevel) => {
    return rowsData.flatMap((row) => [
      <Row
        key={row.id}
        row={row}
        level={currentLevel}
        onAllocationPercent={onAllocationPercent}
        onAllocationValue={onAllocationValue}
      />,
      ...(row.children ? renderRows(row.children, currentLevel + 1) : []),
    ]);
  };

  return <>{renderRows(rows, level)}</>;
};

export default Rows;
