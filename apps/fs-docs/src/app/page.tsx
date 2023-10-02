import {
  Flex,
  Heading,
  Text,
  Button,
} from "@feelsgoodman/frogspawn/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Flex direction="col" items="center" gap={10}>
      <Image src="/logo.png" alt="Logo" width={261.3} height={225} />

      <Flex direction="col" items="center" gap={4}>
        <Heading
          size="5xl"
          weight="bold"
          align="center"
          as="h1"
          className="fs-leading-tight"
        >
          Building Apps <br /> Feels Good Man
        </Heading>

        <Text as="p" size="xl" color="gray" align="center">
          An open-sourced React library of interactive UI
          <br /> components built with Tailwind CSS
        </Text>
      </Flex>

      <Flex gap={4} className="fs-w-full">
        <Button size="xLarge" fullWidth asChild>
          <Link href="/overview/introduction">Get Started</Link>
        </Button>
        <Button size="xLarge" variant="outline" fullWidth asChild>
          <Link href="https://github.com/feelsgoodman-web3" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
            Contribute
          </Link>
        </Button>
      </Flex>
    </Flex>
  );
}
