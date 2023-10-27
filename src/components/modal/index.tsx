import classes from "./modal.module.css";
interface ModalProps {
  closeModal: (bool: boolean) => void;
  deleteProduct: (id: string) => void;
  id: string;
}

export default function Modal({ closeModal, deleteProduct, id }: ModalProps) {
  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <p className={classes.body}>
          Are you sure you want to delete this Product?{" "}
        </p>
        <div className={classes.buttonContainer}>
          <button
            className={classes.cancelBtn}
            onClick={() => closeModal(false)}
          >
            No
          </button>
          <button
            className={classes.deleteBtn}
            onClick={() => deleteProduct(id)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
