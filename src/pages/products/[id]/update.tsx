import { useRouter } from "next/router";
import { FormEvent } from "react";
import useSWR from "swr";
import Link from "next/link";
import classes from "@/styles/create.module.css";

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
    <div className={classes.create_product}>
      <h3 className={classes.form_header}>Update Product</h3>
      <form className={classes.form} onSubmit={(event) => updateProduct(event)}>
        <label className={classes.label} htmlFor="name">
          Name
        </label>
        <input
          className={classes.input}
          type="text"
          name="name"
          id="name"
          defaultValue={name}
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
          defaultValue={description}
        />
        <label className={classes.label} htmlFor="imgSrc">
          Image URL
        </label>
        <input
          className={classes.input}
          type="text"
          name="imageSrc"
          id="imageSrc"
          defaultValue={imageSrc}
        />
        <label className={classes.label} htmlFor="price">
          Price
        </label>
        <input
          className={classes.input}
          type="number"
          name="price"
          id="price"
          defaultValue={price}
          min="0"
          step=".01"
        />
        <label className={classes.label} htmlFor="stockQty">
          StockQty
        </label>
        <input
          className={classes.input}
          type="number"
          name="stockQty"
          id="stockQty"
          min="0"
          defaultValue={stockQty}
        />
        <label className={classes.label} htmlFor="minStockQty">
          Min Stock Qty
        </label>
        <input
          className={classes.input}
          type="number"
          name="minStockQty"
          id="minStockQty"
          defaultValue={minStockQty}
          min="0"
        />
        <div className={classes.buttonContainer}>
          <Link className={classes.link} href="/products">
            <button className={classes.cancel_button} type="button">
              Close
            </button>
          </Link>
          <button type="submit" className={classes.create_button}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
