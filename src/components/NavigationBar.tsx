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
  return (
    <Box as="nav" bg="black" color="white" py="5">
      <Box maxWidth={{ base: "xl", md: "3xl" }} mx="auto">
        <HStack spacing="10" fontSize="sm">
          <Logo />
          <Flex justify="space-between" flex="1">
            <HStack as="ul" listStyleType="none"></HStack>
            <HStack spacing="4">
              <NavLink link="#signin">Sign in</NavLink>
              <NextLink href="#" passHref>
                <Button
                  as="a"
                  variant="outline"
                  _hover={{
                    background: "transparent",
                    borderColor: "white",
                  }}
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