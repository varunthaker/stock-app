import { ProductType } from "../../../../db/model/Product";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import Modal from "@/components/model";

interface productProp {
  product: ProductType;
}

export default function Product({ product }: productProp) {
  const [openModal, setOpenModal] = useState(false);
  const { mutate } = useSWR("/api/products");
  const { name, description, price, stockQty, imageSrc, _id, stockIns } =
    product;
  const router = useRouter();

  async function handleDelete(id: string) {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await response.json();
      mutate();
    } else {
      console.error(`Error: ${response}`);
    }
  }

  return (
    <>
      <h1>{name}</h1>
      <p>Description: {description}</p>
      <Image
        src={imageSrc as string}
        width={250}
        height={250}
        alt="Picture of the author"
      />
      <p>Price: €{price}</p>
      <p>Stock: {stockQty}units</p>
      <button>
        <Link href={`/products/${_id}/update`}>Update</Link>
      </button>
      <button onClick={() => setOpenModal(true)}>Delete</button>
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          deleteProduct={handleDelete}
          id={_id}
        />
      )}
    </>
  );
}
