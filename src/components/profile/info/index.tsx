import AuthButton from "@/components/auth-button/AuthButton";
import { Session } from "next-auth";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import classes from "@/styles/signIn.module.css";

interface ProfileInfoProps {
  session: Session;
}

export default function ProfileInfo({ session }: ProfileInfoProps) {
  return (
    <>
      <div className={classes.userinfoDiv}>
        <Image
          className={classes.userImage}
          width={100}
          height={100}
          src={session.user?.image || `/assets/images/default.png`}
          alt="UserImage"
          priority
        />
        <h1 className={classes.userName}> {session.user?.name}</h1>
        <p className={classes.userInfo}>{session.user?.email}</p>
        <p className={classes.userInfo}>
          {session.user?.name === "varunthaker" || "Varun Thaker"
            ? "Admin"
            : "User"}
        </p>
        <AuthButton />
      </div>

      <Layout />
    </>
  );
}
