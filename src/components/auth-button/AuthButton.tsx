import { useSession, signIn, signOut } from "next-auth/react";
import classes from "@/styles/signIn.module.css";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button className={classes.signInBtn} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className={classes.signInBtn}
        onClick={() => {
          signIn("google", { callbackUrl: "/products" });
        }}
      >
        Sign in
      </button>
    </>
  );
}
