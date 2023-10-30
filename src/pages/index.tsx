import Profile from "@/components/profile";
import classes from "@/styles/signIn.module.css";

export default function Home() {
  return (
    <div className={classes.homePage}>
      <h1 className={classes.appHeader}>Inventur App</h1>
      <Profile />
    </div>
  );
}
