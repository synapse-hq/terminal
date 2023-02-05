import React from "react";
import { ReactElement } from 'react';
import { Box, SimpleGrid, VStack, Icon, Text, Flex, Heading } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack textAlign='center'>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color='purple'
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </VStack>
  );
};

function SimpleThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={CheckIcon} w={10} h={10} />}
          title={'Create a Bucket'}
          text={
            'A unique public endpoint is created.'
          }
        />
        <Feature
          icon={<Icon as={CheckIcon} w={10} h={10} />}
          title={'Add the Endpoint to the webhook service'}
          text={
            'Subscribe to a range of events provided by your favourite service.'
          }
        />
        <Feature
          icon={<Icon as={CheckIcon} w={10} h={10} />}
          title={'Inspect the request'}
          text={
            'Terminal logs your request in crytal clear JSON, ready for you to inspect and debug'
          }
        />
      </SimpleGrid>
    </Box>
  );
}

const Workflow: React.FC = () => {
  return (
    <VStack textAlign='center' mx='auto' pt='10' px='20' py='20'>
      <Heading as="h2" pb={10}>Test any webhook in just 3 steps</Heading>
      <SimpleThreeColumns />
    </VStack>
  )

}

export default Workflow