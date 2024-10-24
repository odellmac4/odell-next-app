import Image from "next/image";
import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
  return (
    <main>
      <h1>Hello World!</h1>
      <Link href="/users">Users</Link>
    </main>
  );
}
