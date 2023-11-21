import AuthButton from "@/components/auth-button/AuthButton";
import { Session } from "next-auth";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import classes from "@/styles/signIn.module.css";
import defaultImage from "@/icons/user.png";
import SignIn from "../sign-in";

interface ProfileInfoProps {
  session: Session;
  userInfostatus: (state: boolean) => void;
}

export default function ProfileInfo({
  session,
  userInfostatus,
}: ProfileInfoProps) {
  return (
    <>
      {session ? (
        <div className={classes.userinfoDiv}>
          <button
            className={classes.cancelBtn}
            onClick={() => userInfostatus(false)}
          >
            x
          </button>
          <Image
            className={classes.userImage}
            width={60}
            height={60}
            //@ts-ignore
            src={session.user?.image}
            alt="UserImage"
            priority
          />
          <h1 className={classes.userName}> {session.user?.name}</h1>

          <p className={classes.userInfo}>
            {session.user?.name === "varunthaker" || "Varun Thaker"
              ? "Admin"
              : "User"}
          </p>
          <AuthButton />
        </div>
      ) : (
        <SignIn />
      )}
      <Layout />
    </>
  );
}
