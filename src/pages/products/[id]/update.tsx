import { useRouter } from "next/router";
import useSWR from "swr";

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;

  console.log("id", id);
  const { data: product, isLoading, error } = useSWR(`api/products/${id}`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log("products", product);

  // fetch(`api/products/${id}`);

  return (
    <>
      <h3>Update Form</h3>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" rows={4} cols={50} />
        <label htmlFor="imgSrc">imageSrc</label>
        <input type="text" name="imageSrc" id="imageSrc" />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" />
        <label htmlFor="stockQty">stockQty</label>
        <input type="number" name="stockQty" id="stockQty" />
        <label htmlFor="minStockQty">minStockQty</label>
        <input type="number" name="minStockQty" id="minStockQty" />
        <button type="submit">Update</button>
      </form>
    </>
  );
}
