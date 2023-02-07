import React from "react";

import { Box, VStack, Heading, Text, HStack, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import routes from "../constants/routes"
import { useAuth } from "../hooks/use-auth";
import { authIsInitialized } from "../assertions";


const Header: React.FC = () => {
  const router = useRouter()
  const auth = useAuth();

  const redirectToLogin = () => {
    router.push("/sign-in")
  }
  
  return (
    <Box bg="black" pt="30" pb="60">
      <VStack color="white" textAlign="center" spacing="6" pt="20">
        <Heading
          as="h1"
          fontSize="6xl"
          maxWidth={{ base: "lg", md: "xl", lg: "2xl" }}
        >
          Webhooks.{" "}
          <Box
            as="span"
            bgGradient="linear-gradient(135deg, #0b6ec5, #5e49af, #f35815, #fed54a)"
            bgClip="text"
          >
            Made Easy
          </Box>
        </Heading>
        <Text color="whiteAlpha.700" fontSize="2xl">
          Create, inspect, and test webhooks with ease.
        </Text>
        <HStack spacing="6">
          <Button
            rightIcon={<ChevronRightIcon></ChevronRightIcon>}
            colorScheme="purple"
            onClick={redirectToLogin}
          >
            Get Started
          </Button>
          <a href={routes.GIT_REPO} target="_blank">
            <Button
              variant="outline"
              borderColor="purple.600"
              _hover={{ backgroundColor: "transparent" }}
            >
              View on Github
            </Button>
          </a>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Header;
