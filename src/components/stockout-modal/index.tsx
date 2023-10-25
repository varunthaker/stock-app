import { FormEvent } from "react";
import { StockOutArray } from "../../../db/model/Stockout";

interface StockModalProps {
  closeStockModal: (bool: boolean) => void;
  handleStockOut: (data: StockOutArray) => void;
}

export default function StockOutModal({
  closeStockModal,
  handleStockOut,
}: StockModalProps) {
  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    handleStockOut(data);
  }

  return (
    <>
      <h4>Stock Out Modal</h4>
      <form onSubmit={(event) => handleSubmitForm(event)}>
        <label htmlFor="stockOutQty"> Stock* </label>
        <input type="number" name="stockOutQty" id="stockOutQty" required />
        <label htmlFor="date"> Date:* </label>
        <input type="date" name="date" id="date" required />
        <label htmlFor="reference"> Reference </label>
        <input type="text" name="reference" id="reference" />
        <button type="button" onClick={() => closeStockModal(false)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
