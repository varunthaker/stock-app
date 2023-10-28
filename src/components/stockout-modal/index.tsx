import { FormEvent } from "react";
import { StockOutArray } from "@/db/model/StockOut";
import classes from "@/styles/modalStockInOut.module.css";

interface StockModalProps {
  closeStockModal: (bool: boolean) => void;
  handleStockOut: (data: StockOutArray) => void;
  maxStockQty: number;
}

export default function StockOutModal({
  closeStockModal,
  handleStockOut,
  maxStockQty,
}: StockModalProps) {
  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    handleStockOut(data as unknown as StockOutArray);
    closeStockModal(false);
  }

  return (
    <div className={classes.modalBackground}>
      <div>
        <form
          onSubmit={(event) => handleSubmitForm(event)}
          className={classes.form}
        >
          <h4 className={classes.form_header}>Stock Out</h4>
          <label htmlFor="stockOutQty" className={classes.label}>
            Qty
          </label>
          <input
            type="number"
            name="stockOutQty"
            id="stockOutQty"
            required
            max={maxStockQty}
            className={classes.input}
          />
          <label htmlFor="date" className={classes.label}>
            Date:
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className={classes.input}
            required
          />
          <label htmlFor="reference" className={classes.label}>
            Reference
          </label>
          <input
            className={classes.input}
            type="text"
            name="reference"
            id="reference"
          />
          <div className={classes.buttonContainer}>
            <button
              type="button"
              onClick={() => closeStockModal(false)}
              className={classes.NoSubmitBtn}
            >
              Cancel
            </button>
            <button className={classes.submitBtn} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
