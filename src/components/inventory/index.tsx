import Image from "next/image";
import { Fragment, MouseEvent, useState } from "react";
import { ProductType } from "../../../db/model/Product";
import StockInModal from "../stockin-modal";
import StockOutModal from "../stockout-modal";
import { StockInArray } from "../../../db/model/Stockin";
import { StockOutArray } from "../../../db/model/Stockout";

interface InventoryProductProps {
  product: ProductType;
}

export default function InventoryProduct({ product }: InventoryProductProps) {
  const { name, stockQty, imageSrc, minStockQty, stockins, stockouts } =
    product;
  const [openStockModal, setOpenStockModal] = useState(false);
  const [stockButtonId, setStockButtonId] = useState("");

  function handleStockUpdate(event) {
    setOpenStockModal(true);
    setStockButtonId(event.target.id);
  }

  function StockIn(stockInData: StockInArray) {
    console.log("clicked StockIn");
    console.log(stockInData);
  }

  function StockOut(stockOutData: StockOutArray) {
    console.log("clicked StockOut");
    console.log(stockOutData);
  }

  return (
    <Fragment>
      <Image
        src={imageSrc as string}
        width={100}
        height={100}
        alt="Picture of the author"
      />
      <h4>{name}</h4>
      <p>Stock: {stockQty} units</p>
      <p>MinStockQty: {minStockQty}</p>
      <button onClick={(event) => handleStockUpdate(event)} id={"stockIn"}>
        +
      </button>
      <button onClick={(event) => handleStockUpdate(event)} id={"stockOut"}>
        -
      </button>
      {openStockModal && stockButtonId === "stockIn" && (
        <StockInModal
          closeStockModal={setOpenStockModal}
          handleStockIn={StockIn}
        />
      )}
      {openStockModal && stockButtonId === "stockOut" && (
        <StockOutModal
          closeStockModal={setOpenStockModal}
          handleStockOut={StockOut}
        />
      )}
    </Fragment>
  );
}
