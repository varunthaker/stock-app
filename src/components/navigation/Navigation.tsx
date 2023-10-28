import Link from "next/link";
import classes from "@/styles/navigation.module.css";
import { useState, useEffect } from "react";
import { TAB } from "@/constants/general";
export default function Navigation() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  function handleTabClick(tabName: string) {
    setActiveTab(tabName);
  }

  return (
    <div className={classes.NavigationMenu}>
      <Link href="/products">
        <button
          className={
            activeTab === TAB.PRODUCT
              ? `${classes.active} ${classes.button} `
              : classes.button
          }
          onClick={() => handleTabClick(TAB.PRODUCT)}
        >
          📦
        </button>
      </Link>

      <Link href="/inventory">
        <button
          className={
            activeTab === TAB.INVENTORY
              ? `${classes.active} ${classes.button} `
              : classes.button
          }
          onClick={() => handleTabClick(TAB.INVENTORY)}
        >
          📋
        </button>
      </Link>
      <Link href="/analysis">
        <button
          className={
            activeTab === TAB.ANALYSIS
              ? `${classes.active} ${classes.button} `
              : classes.button
          }
          onClick={() => handleTabClick(TAB.ANALYSIS)}
        >
          📈
        </button>
      </Link>
    </div>
  );
}
