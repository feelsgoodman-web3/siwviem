import { AppBar } from "@feelsgoodman/frogspawn/components";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <AppBar>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={40.6} height={30} />
      </Link>
    </AppBar>
  );
}
