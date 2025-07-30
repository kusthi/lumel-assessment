import { useState, useCallback } from "react";

import Table from "../Table/Table";
import "./HierarchicalTable.css";

const HierarchicalTable = () => {
  const initialData = {
    rows: [
      {
        id: "electronics",
        label: "Electronics",
        value: 1500,
        originalValue: 1500,
        children: [
          {
            id: "phones",
            label: "Phones",
            value: 800,
            originalValue: 800,
          },
          {
            id: "laptops",
            label: "Laptops",
            value: 700,
            originalValue: 700,
          },
        ],
      },
      {
        id: "furniture",
        label: "Furniture",
        value: 1000,
        originalValue: 1000,
        children: [
          {
            id: "tables",
            label: "Tables",
            value: 300,
            originalValue: 300,
          },
          {
            id: "chairs",
            label: "Chairs",
            value: 700,
            originalValue: 700,
          },
        ],
      },
    ],
  };

  const [data, setData] = useState(initialData);

  const roundToTwoDecimals = (num) => {
    return Math.round(num * 100) / 100;
  };

  const updateRowValue = useCallback(
    (rowId, newValue, isPercentage = false) => {
      setData((prevData) => {
        const newData = { ...prevData, rows: [...prevData.rows] };

        const updateRow = (rows, targetId, value, isPerc) => {
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            if (row.id === targetId) {
              const updatedRow = { ...row };

              if (isPerc) {
                const newVal = row.value * (1 + value / 100);
                updatedRow.value = roundToTwoDecimals(newVal);
              } else {
                if (updatedRow.children && updatedRow.children.length > 0) {
                  // If updating a parent with children, distribute proportionally
                  const currentTotal = updatedRow.children.reduce(
                    (sum, child) => sum + child.value,
                    0
                  );
                  updatedRow.children = updatedRow.children.map((child) => ({
                    ...child,
                    value:
                      currentTotal > 0
                        ? roundToTwoDecimals(
                            (child.value / currentTotal) * value
                          )
                        : value / updatedRow.children.length,
                  }));
                  updatedRow.value = roundToTwoDecimals(value);
                } else {
                  updatedRow.value = roundToTwoDecimals(value);
                }
              }

              rows[i] = updatedRow;
              return true;
            }

            if (row.children) {
              const updatedChildren = [...row.children];
              const childUpdated = updateRow(
                updatedChildren,
                targetId,
                value,
                isPerc
              );
              if (childUpdated) {
                const updatedRow = { ...row, children: updatedChildren };

                const newParentValue = updatedChildren.reduce(
                  (sum, child) => sum + child.value,
                  0
                );
                updatedRow.value = roundToTwoDecimals(newParentValue);
                rows[i] = updatedRow;

                return true;
              }
            }
          }
          return false;
        };

        updateRow(newData.rows, rowId, newValue, isPercentage);
        return newData;
      });
    },
    []
  );

  const handleAllocationPercent = (rowId, value) => {
    updateRowValue(rowId, value, true);
  };

  const handleAllocationValue = (rowId, value) => {
    updateRowValue(rowId, value, false);
  };

  return (
    <div className="hierarchical-table-container">
      <h1>Hierarchical Sales Data Table</h1>

      <Table
        data={data}
        onAllocationPercent={handleAllocationPercent}
        onAllocationValue={handleAllocationValue}
      />
    </div>
  );
};

export default HierarchicalTable;
