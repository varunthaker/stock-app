import { useSession } from "next-auth/react";
import ProfileInfo from "./info";
import SignIn from "./sign-in";

// type sessionProp = {
//   session: any;
// };

export default function Profile() {
  const { data: session } = useSession();

  console.log(session);
  return (
    <section>
      {session ? <ProfileInfo session={session} /> : <SignIn />}
    </section>
  );
}
