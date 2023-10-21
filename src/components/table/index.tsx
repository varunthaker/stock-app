/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { ProductType } from "../../../db/model/Product";
import { useTable } from "react-table";
import React from "react";

interface InventoryAnalysisTable {
  productTableData: ProductType;
}

export default function InventoryAnalysisTable({
  productTableData,
}: InventoryAnalysisTable) {
  //   console.log(productTableData);

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
    useTable({ columns, data: TableData });

  //   console.log("headergroups", headerGroups);
  console.log("rows", rows);

  return (
    <>
      <h1>Table</h1>
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
              //   const color =
              //     row.values.stockQty > row.values.minStockQty ? "null" : "red";
              //   console.log(color);
              //   console.log(row.values.stockQty);
              //   console.log(row.values.minStockQty);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    // console.log("cell", cell);

                    // console.log("index", index);
                    // console.log("cell", cell.value);
                    // console.log(color);

                    return (
                      <td
                        {...cell.getCellProps()}
                        // style={{ backgroundColor: { color } }}
                      >
                        {cell.render("Cell")}
                      </td>
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
