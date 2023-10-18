import { FormEvent } from "react";
import { useRouter } from "next/router";

export default function CreateProduct() {
  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push("/products");
  }

  return (
    <>
      <h3>Create Form</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
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
        <button type="submit">Create</button>
      </form>
    </>
  );
}
