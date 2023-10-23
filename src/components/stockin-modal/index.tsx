export default function StockInModal({ closeStockModal }) {
  return (
    <div>
      <h4>Stock In Modal</h4>
      <form>
        <label htmlFor="stock"> Stock* </label>
        <input type="number" name="stock" id="stock" required />
        <label htmlFor="date"> Date:* </label>
        <input type="date" name="date" id="date" required />
        <label htmlFor="reference"> Reference </label>
        <input type="number" name="reference" id="reference" />
        <button onClick={() => closeStockModal(false)}>Cancel</button>
        <button>Update</button>
      </form>
    </div>
  );
}
