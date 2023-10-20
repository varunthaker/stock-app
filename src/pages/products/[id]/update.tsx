import { useRouter } from "next/router";
import { FormEvent } from "react";
import useSWR from "swr";

export default function UpdateProduct() {
  const router = useRouter();
  const { id } = router.query;
  const { data: product, isLoading, error } = useSWR(`/api/products/${id}`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const { name, description, imageSrc, price, stockQty, minStockQty } = product;

  async function updateProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push("/products");
  }

  return (
    <>
      <h3>Update Form</h3>
      <form onSubmit={(event) => updateProduct(event)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" defaultValue={name} />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows={4}
          cols={50}
          defaultValue={description}
        />
        <label htmlFor="imgSrc">imageURL</label>
        <input
          type="text"
          name="imageSrc"
          id="imageSrc"
          defaultValue={imageSrc}
        />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" defaultValue={price} />
        <label htmlFor="stockQty">stockQty</label>
        <input
          type="number"
          name="stockQty"
          id="stockQty"
          defaultValue={stockQty}
        />
        <label htmlFor="minStockQty">minStockQty</label>
        <input
          type="number"
          name="minStockQty"
          id="minStockQty"
          defaultValue={minStockQty}
        />
        <button type="submit">Update</button>
      </form>
    </>
  );
}
