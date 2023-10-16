import Navigation from "../navigation/Navigation";
import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
