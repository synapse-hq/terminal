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
import { NavLinkProps } from "../types"

const NavLink: React.FC<NavLinkProps> = ({ link, children }) => {
  return (
    <NextLink href={link} passHref>
      <Link as="span" fontWeight="bold">{children}</Link>
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
            <HStack key="homepage-actions-formatter" as="ul" listStyleType="none"></HStack>
            <HStack key="homepage-actions" spacing="4">
              <NavLink key="sign-in" link="sign-in">Sign in</NavLink>

              <NextLink key="get-started" href="#" passHref>
                <Button
                  as="button"
                  variant="outline"
                  _hover={{
                    background: "teal",
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
