import { FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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

    if (response.ok) {
      await response.json();
      router.push("/products");
    } else {
      console.error(`Error: ${response}`);
    }
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
        <input type="number" name="price" id="price" min="0" step=".01" />
        <label htmlFor="stockQty">stockQty</label>
        <input type="number" name="stockQty" id="stockQty" min="0" />
        <label htmlFor="minStockQty">minStockQty</label>
        <input type="number" name="minStockQty" id="minStockQty" min="0" />
        <button type="submit">Create</button>
        <button type="button">
          <Link href="/products">Back</Link>
        </button>
      </form>
    </>
  );
}
