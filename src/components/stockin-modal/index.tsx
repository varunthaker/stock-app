import { FormEvent } from "react";
import { StockInArray } from "@/db/model/StockIn";
import classes from "@/styles/modalStockInOut.module.css";

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
    <div className={classes.modalBackground}>
      <div>
        <form
          className={classes.form}
          onSubmit={(event) => handleSubmitForm(event)}
        >
          <h4 className={classes.form_header}>Stock In</h4>
          <label className={classes.label} htmlFor="stockInQty">
            Qty
          </label>
          <input
            type="number"
            name="stockInQty"
            id="stockInQty"
            required
            min={0}
            className={classes.input}
          />
          <label htmlFor="date" className={classes.label}>
            Date
          </label>
          <input
            className={classes.input}
            type="date"
            name="date"
            id="date"
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
              className={classes.NoSubmitBtn}
              type="button"
              onClick={() => closeStockModal(false)}
            >
              Cancel
            </button>
            <button className={classes.submitBtn} type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
