import { FormEvent } from "react";

export default function ProductCreateForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
    console.log("Clicked Submit Button");

    const formElement = event.currentTarget;

    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);
    console.log(data);
  }

  return (
    <>
      <h1>Nothing</h1>
      {/* <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" rows="4" cols="50" />
        <label htmlFor="imgSrc">imageSrc</label>
        <input type="text" name="imageSrc" id="imageSrc" />
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" />
        <label htmlFor="stockQty">stockQty</label>
        <input type="number" name="stockQty" id="stockQty" />
        <label htmlFor="minStockQty">minStockQty</label>
        <input type="number" name="minStockQty" id="minStockQty" />
        <button type="submit">Add Product</button>
      </form> */}
    </>
  );
}
