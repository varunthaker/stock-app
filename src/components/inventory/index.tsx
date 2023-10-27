import Image from "next/image";
import { Fragment, useState } from "react";
import { ProductType } from "../../../db/model/Product";
import StockInModal from "../stockin-modal";
import StockOutModal from "../stockout-modal";

//@ts-ignore
import { StockInArray } from "../../../db/model/StockIn";
//@ts-ignore
import { StockOutArray } from "../../../db/model/StockOut";
import { STOCK_UPDATE } from "@/constants/general";
// import StockOutErrorModal from "../stockout-error-modal";

interface InventoryProductProps {
  product: ProductType;
  mutate: () => void;
}

export default function InventoryProduct({
  product,
  mutate,
}: InventoryProductProps) {
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const { name, stockQty, imageSrc, minStockQty, _id: id } = product;
  const [openStockModal, setOpenStockModal] = useState(false);
  const [stockButtonId, setStockButtonId] = useState<String | null>(null);

  function handleStockUpdate(id: string) {
    setOpenStockModal(true);
    setStockButtonId(id);
  }

  async function StockIn(stockInData: StockInArray) {
    const response = await fetch(`/api/products/${id}/stockin`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockInData),
    });

    if (response.ok) {
      mutate();
    } else {
      const error = await response.json();
      console.error("Error in StockIn fetch");
      setErrorMessage(error.message);
    }
  }

  async function StockOut(stockOutData: StockOutArray) {
    const response = await fetch(`/api/products/${id}/stockout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockOutData),
    });
    if (response.ok) {
      mutate();
    } else {
      const error = await response.json();
      console.error("Error in StockOut fetch");
      setErrorMessage(error.message);
    }
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
      <button onClick={() => handleStockUpdate(STOCK_UPDATE.IN)}>+</button>
      <button onClick={() => handleStockUpdate(STOCK_UPDATE.OUT)}>-</button>
      {/* {errorMessage && <StockOutErrorModal ErrorMessage={errorMessage} />} */}
      {openStockModal && stockButtonId === STOCK_UPDATE.IN && (
        <StockInModal
          closeStockModal={setOpenStockModal}
          handleStockIn={StockIn}
        />
      )}
      {openStockModal && stockButtonId === STOCK_UPDATE.OUT && (
        <StockOutModal
          closeStockModal={setOpenStockModal}
          handleStockOut={StockOut}
          maxStockQty={stockQty}
        />
      )}
    </Fragment>
  );
}
