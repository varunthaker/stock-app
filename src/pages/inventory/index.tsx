import Layout from "@/components/layout/Layout";
import StockInModal from "@/components/stockin-modal";
import { useState } from "react";

export default function InventoryPage() {
  const [openStockModal, setOpenStockModal] = useState(false);

  return (
    <>
      <h1>Inventory</h1>
      <button onClick={() => setOpenStockModal(true)}>+</button>
      <button onClick={() => setOpenStockModal(true)}>-</button>
      {openStockModal && <StockInModal closeStockModal={setOpenStockModal} />}

      <Layout />
    </>
  );
}
