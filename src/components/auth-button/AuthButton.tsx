import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  console.log("session is", session);

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          signIn();
        }}
      >
        Sign in
      </button>
    </>
  );
}
