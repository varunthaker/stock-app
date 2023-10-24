interface ModalProps {
  closeModal: (bool: boolean) => void;
  deleteProduct: (id: string) => void;
  id: string;
}

export default function Modal({ closeModal, deleteProduct, id }: ModalProps) {
  return (
    <div>
      <h4>Delete Product</h4>
      <p>Are you sure you want to delete this Product? </p>
      <button onClick={() => closeModal(false)}>Cancel</button>
      <button onClick={() => deleteProduct(id)}>Yes</button>
    </div>
  );
}
