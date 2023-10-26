import { ProductType } from "../../../../db/model/Product";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";
import Modal from "@/components/modal";
import classes from "./product.module.css";

interface productProp {
  product: ProductType;
  closeModal: () => void;
  deleteProduct: () => void;
}

export default function Product({ product }: productProp) {
  const [openModal, setOpenModal] = useState(false);
  const { mutate } = useSWR("/api/products");
  const { name, description, price, stockQty, imageSrc, _id } = product;
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
    <div className={classes.product}>
      <div>
        <Image
          className={classes.product_image}
          width={250}
          height={250}
          src={imageSrc as string}
          alt="Picture of the author"
        />
      </div>
      <div className={classes.product_info}>
        <h1 className={classes.product_header}>{name}</h1>
        <p className={classes.product_description}>{description}</p>

        <p className={classes.product_stockInfo}>Price: € {price}</p>
        <p className={classes.product_stockInfo}>Stock: {stockQty} units</p>
        <div>
          <button className={classes.update_button}>
            <Link
              className={classes.update_link}
              href={`/products/${_id}/update`}
            >
              ✏️
            </Link>
          </button>
          <button
            className={classes.delete_button}
            onClick={() => setOpenModal(true)}
          >
            🗑️
          </button>
        </div>
      </div>
      <div>
        {openModal && (
          <Modal
            closeModal={setOpenModal}
            deleteProduct={handleDelete}
            id={_id}
          />
        )}
      </div>
    </div>
  );
}
