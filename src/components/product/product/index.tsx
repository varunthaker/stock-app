import { ProductType } from "../../../../db/model/Product";
import Image from "next/image";
import Button from "../button/productbutton";

interface productProp {
  product: ProductType;
}

export default function Product({ product }: productProp) {
  const { name, description, price, stockQty, imageSrc } = product;

  function handleUpdate() {
    console.log("Update Button Clicked");
  }

  function handleDelete() {
    console.log("Delete Button Clicked");
  }

  return (
    <>
      <h1>Name: {name}</h1>
      <p>Description: {description}</p>
      <Image
        src={imageSrc}
        width={250}
        height={250}
        alt="Picture of the author"
      />
      <p>Price: €{price}</p>
      <p>Stock: {stockQty}units</p>
      <Button text={"Update"} handleClick={handleUpdate} />
      <Button text={"Delete"} handleClick={handleDelete} />
    </>
  );
}
