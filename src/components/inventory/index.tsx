import Image from "next/image";
import { Fragment, useState } from "react";
import { ProductType } from "@/db/model/Product";
import { StockInArray } from "@/db/model/StockIn";
import { StockOutArray } from "@/db/model/StockOut";
import { STOCK_UPDATE } from "@/constants/general";
import StockInModal from "../stockin-modal";
import StockOutModal from "../stockout-modal";
import classes from "@/styles/product.module.css";

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
  const [stockButtonId, setStockButtonId] = useState<string | null>(null);

  const handleStockUpdate = (id: string) => {
    setOpenStockModal(true);
    setStockButtonId(id);
  };

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
    <div className={classes.product}>
      <div>
        <Image
          className={classes.product_image}
          src={imageSrc as string}
          width={150}
          height={150}
          alt="Picture of the author"
        />
      </div>
      <div className={classes.product_info}>
        <h4 className={classes.product_header}>{name}</h4>
        <p className={classes.product_stockInfo}>Stock: {stockQty} units</p>
        <p className={classes.product_stockInfo}>
          Min Stock Qty: {minStockQty} units
        </p>
        <div>
          <button
            className={classes.addStockBtn}
            onClick={() => {
              handleStockUpdate(STOCK_UPDATE.IN);
            }}
          >
            ➕
          </button>
          <button
            className={classes.removeStockBtn}
            onClick={() => handleStockUpdate(STOCK_UPDATE.OUT)}
          >
            ➖
          </button>
        </div>
      </div>

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
    </div>
  );
}
