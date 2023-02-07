import React from "react";
import { HStack, Icon, Heading } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons';

const Logo = (props: any) => {
  return (
    <HStack spacing='5'>
      <Icon as={ArrowRightIcon} fontSize="xl"/>
      <Heading fontSize='20px' fontFamily='roboto'>Terminal</Heading>
    </HStack>
  );
};

export default Logo