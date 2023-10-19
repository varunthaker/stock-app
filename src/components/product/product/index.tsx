import { ProductType } from "../../../../db/model/Product";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface productProp {
  product: ProductType;
}

export default function Product({ product }: productProp) {
  const { name, description, price, stockQty, imageSrc, _id } = product;
  const router = useRouter();

  function handleUpdate() {
    console.log("Update Button Clicked");
  }

  async function handleDelete(id: string) {
    // console.log(id);
    // console.log("Delete Button Clicked");

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    router.push("/products");
  }

  return (
    <>
      <h1>{name}</h1>
      <p>Description: {description}</p>
      <Image
        src={imageSrc}
        width={250}
        height={250}
        alt="Picture of the author"
      />
      <p>Price: €{price}</p>
      <p>Stock: {stockQty}units</p>
      <button>
        <Link href={`/products/update/${_id}`}>Update</Link>
      </button>
      <button onClick={() => handleDelete(_id)}>Delete</button>
    </>
  );
}
