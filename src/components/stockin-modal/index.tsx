import { FormEvent } from "react";
// @ts-ignore
import { StockInArray } from "../../../db/model/StockIn";

interface StockModalProps {
  closeStockModal: (bool: boolean) => void;
  handleStockIn: (data: StockInArray) => void;
}

export default function StockInModal({
  closeStockModal,
  handleStockIn,
}: StockModalProps) {
  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    //To do Investigate why this need to be converted
    handleStockIn(data as unknown as StockInArray);
    closeStockModal(false);
  }

  return (
    <>
      <h4>Stock In Modal</h4>
      <form onSubmit={(event) => handleSubmitForm(event)}>
        <label htmlFor="stockInQty"> Stock* </label>
        <input
          type="number"
          name="stockInQty"
          id="stockInQty"
          required
          min={0}
        />
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
