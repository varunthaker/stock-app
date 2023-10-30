import AuthButton from "@/components/auth-button/AuthButton";
import classes from "@/styles/signIn.module.css";

export default function SignIn() {
  return (
    <div className={classes.signInDiv}>
      <p className={classes.signHeader}>
        You are not Sign-In. <br />
        Sign in with Google/GitHub
      </p>
      <AuthButton />
    </div>
  );
}
