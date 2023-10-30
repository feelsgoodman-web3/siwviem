import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@feelsgoodman/fs-ui/components"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <Box
      asChild
      className="fs-max-w-[850px] fs-w-full"
      py={20}
      px={{
        initial: 4,
        sm: 20,
      }}
      mx="auto"
    >
      <Flex direction="col" items="center" gap={10}>
        <Image src="/logo.png" alt="Logo" width={261.3} height={225} />

        <Flex direction="col" items="center" gap={4}>
          <Heading
            size={{
              initial: "3xl",
              sm: "5xl",
            }}
            weight="bold"
            align="center"
            as="h1"
            className="fs-leading-tight"
          >
            Building Apps <br /> Feels Good Man
          </Heading>

          <Text
            as="p"
            size={{
              sm: "xl",
            }}
            color="gray"
            align="center"
          >
            An open-sourced React library of interactive UI
            <br /> components built with Tailwind CSS
          </Text>
        </Flex>

        <Flex gap={4} className="fs-w-full" justify="center">
          <Button size={{ initial: "default", sm: "xLarge" }} asChild>
            <Link href="/docs/overview/introduction">Get Started</Link>
          </Button>
          <Button
            size={{ initial: "default", sm: "xLarge" }}
            variant="outline"
            asChild
          >
            <Link href="https://github.com/feelsgoodman-web3" target="_blank">
              <FontAwesomeIcon icon={faGithub} />
              Contribute
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
