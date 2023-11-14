import { useSession } from "next-auth/react";
import ProfileInfo from "./info";
import SignIn from "./sign-in";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <section>
      {session ? ( //@ts-ignore
        <ProfileInfo session={session} />
      ) : (
        <SignIn />
      )}
    </section>
  );
}
