/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { ProductType } from "@/db/model/Product";
import { useTable } from "react-table";
import React from "react";

import classes from "@/styles/table.module.css";

import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
    <div className={classes.tableMainContainer}>
      <p className={classes.table_header}>Product Purchase</p>
      <p className={classes.description}>
        Quick Overview for Product to be Purchase
      </p>
      <div className={classes.tableSubContainer}>
        <table className={classes.table} {...getTableProps()}>
          <thead className={classes.thead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className={classes.th} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              const isLowStock = row.values.stockQty < row.values.minStockQty;

              return (
                <tr
                  {...row.getRowProps()}
                  // @ts-ignore
                  style={{ color: isLowStock ? "#CD124A" : null }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td className={classes.td} {...cell.getCellProps()}>
                        {cell.render("Cell")}{" "}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
