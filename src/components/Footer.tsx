import { Box, Text, Flex, useColorModeValue, Heading, Icon, HStack } from "@chakra-ui/react";
import Logo from './Logo'

export default function LargeWithLogoCentered() {
  return (
    <Box
      bg={useColorModeValue("black", "gray.900")}
      color={useColorModeValue("white", "gray.200")}
      p={20}
    >
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2023 Terminal. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
