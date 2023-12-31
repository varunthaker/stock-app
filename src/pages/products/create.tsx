import { FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "@/styles/create.module.css";

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
    <div className={classes.create_product}>
      <h3 className={classes.form_header}>Create Product</h3>
      <form className={classes.form} onSubmit={(event) => handleSubmit(event)}>
        <label className={classes.label} htmlFor="name">
          Name
        </label>
        <input
          className={classes.input}
          type="text"
          name="name"
          id="name"
          required
        />
        <label className={classes.label} htmlFor="description">
          Description
        </label>
        <textarea
          className={classes.textarea}
          name="description"
          id="description"
          rows={4}
          cols={50}
        />
        <label className={classes.label} htmlFor="imgSrc">
          Image URL
        </label>
        <input
          className={classes.input}
          type="text"
          name="imageSrc"
          id="imageSrc"
          placeholder="Enter URL starts with https"
        />
        <label className={classes.label} htmlFor="price">
          Price
        </label>
        <input
          className={classes.input}
          type="number"
          name="price"
          id="price"
          min="0"
          step=".01"
          required
        />
        <label className={classes.label} htmlFor="stockQty">
          Stock Qty
        </label>
        <input
          className={classes.input}
          type="number"
          name="stockQty"
          id="stockQty"
          min="0"
          required
        />
        <label className={classes.label} htmlFor="minStockQty">
          Min Stock Qty
        </label>
        <input
          className={classes.input}
          type="number"
          name="minStockQty"
          id="minStockQty"
          min="0"
          required
        />

        <div className={classes.buttonContainer}>
          <Link href="/products">
            <button className={classes.cancel_button} type="button">
              Close
            </button>
          </Link>
          <button type="submit" className={classes.create_button}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
