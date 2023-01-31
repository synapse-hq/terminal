import {
  Box,
  HStack,
  Link,
  Flex,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Logo from "./Logo";
import { useRouter } from "next/router"

interface Props {
  children: React.ReactNode;
  link: string;
}

const NavLink: React.FC<Props> = ({ link, children }) => {
  return (
    <NextLink href={link} passHref>
      <Link fontWeight="bold">{children}</Link>
    </NextLink>
  );
};

const NavigationBar: React.FC = () => {
  const router = useRouter()
  const redirectToLogin = () => {
    router.push("/sign-in")
  }
  
  return (
    <Box as="nav" bg="black" color="white" py="5">
      <Box maxWidth={{ base: "xl", md: "3xl" }} mx="auto">
        <HStack spacing="10" fontSize="sm">
          <Logo />
          <Flex justify="space-between" flex="1">
            <HStack as="ul" listStyleType="none"></HStack>
            <HStack spacing="4">
              <NavLink link="sign-in">Sign in</NavLink>
              <NextLink href="#" passHref>
                <Button
                  as="a"
                  variant="outline"
                  _hover={{
                    background: "transparent",
                    borderColor: "white",
                  }}
                  onClick={redirectToLogin}
                >
                  Get Started
                </Button>
              </NextLink>
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
};

export default NavigationBar;
