import Layout from "@/components/layout/Layout";
import Product from "@/components/product/product";
import useSWR from "swr";
import { ProductType } from "@/db/model/Product";
import { useState } from "react";
import Link from "next/link";
import ProductNotFound from "@/components/product/productnotfound";
import classes from "@/styles/ProductPage.module.css";
import ProfileInfo from "@/components/profile/info";
import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultImage from "@/icons/user.png";

interface ProductPageProps {
  closeModal: () => void;
  deleteProduct: () => void;
}

export default function ProductPage({
  closeModal,
  deleteProduct,
}: ProductPageProps) {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const { data: session } = useSession();
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const filteredProducts = products.filter((product: ProductType) => {
    return product.name.toLowerCase().includes(userSearchInput.toLowerCase());
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserSearchInput(event.target.value);
  }

  return (
    <>
      <button
        className={classes.avatarBtn}
        onClick={() => setUserInfo(!userInfo)}
      >
        {!userInfo && (
          <Image
            className={classes.userImage}
            width={60}
            height={60}
            //@ts-ignore
            src={session ? session.user?.image : defaultImage}
            alt="UserImage"
            priority
          />
        )}
      </button>
      {userInfo && (
        <div className={classes.avatar_container}>
          <ProfileInfo
            //@ts-ignore
            session={session}
            userInfostatus={setUserInfo}
          />
        </div>
      )}
      <div className={classes.products_page}>
        <h1 className={classes.page_header}>Products</h1>
        <div className={classes.search_container}>
          <input
            className={classes.input}
            type="text"
            placeholder="🔎    Search "
            onChange={(event) => handleInputChange(event)}
          ></input>
        </div>
        <>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: ProductType) => {
              return (
                <div key={product._id}>
                  <Product
                    product={product}
                    closeModal={closeModal}
                    deleteProduct={deleteProduct}
                  />
                </div>
              );
            })
          ) : (
            <ProductNotFound searchQuery={userSearchInput} />
          )}
        </>

        <Link href="/products/create" className={classes.create_link}>
          <button type="button" className={classes.create_button}>
            +
          </button>
        </Link>
      </div>
      <Layout />
    </>
  );
}
