/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { ProductType } from "@/db/model/Product";
import { useTable } from "react-table";
import React from "react";

interface InventoryAnalysisTable {
  productTableData: ProductType;
}

export default function InventoryAnalysisTable({
  productTableData,
}: InventoryAnalysisTable) {
  const TableData = React.useMemo(() => productTableData, []);
  const columns = React.useMemo(
    () => [
      { Header: "Product Name", accessor: "name" },
      { Header: "Stock", accessor: "stockQty" },
      { Header: "Minimum Stock", accessor: "minStockQty" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore
    useTable({ columns, data: TableData });

  return (
    <>
      <h2>Table</h2>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);

              const isLowStock = row.values.stockQty < row.values.minStockQty;

              return (
                <tr
                  {...row.getRowProps()}
                  // @ts-ignore
                  style={{ color: isLowStock ? "red" : null }}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
