import AuthButton from "@/components/auth-button/AuthButton";
import { Session } from "next-auth";
import Image from "next/image";

// interface Session {
//   user: {
//     address: string;
//   };
// }

export default function ProfileInfo(session: Session) {
  return (
    <>
      <div>
        <h1>Hello {session.user?.name}</h1>
        <p>You are signed in as {session.user?.email}</p>
        <p>
          {session.user?.name === "varunthaker" || "Varun Thaker"
            ? "Admin"
            : "User"}
        </p>
      </div>
      <Image
        width={150}
        height={150}
        src={session.user?.image || `/assets/images/default.png`}
        alt="UserImage"
        priority
      />
      <AuthButton />
    </>
  );
}
