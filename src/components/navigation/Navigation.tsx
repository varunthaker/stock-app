import Link from "next/link";
export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/products">Products</Link>
      </li>
      <li>
        <Link href="/analysis">Analysis</Link>
      </li>
      <li>
        <Link href="/inventory">Inventory</Link>
      </li>
    </ul>
  );
}
