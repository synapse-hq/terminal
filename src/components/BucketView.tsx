import {
  Heading,
  Text,
  VStack,
  HStack,
  Box,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Stack,
  OrderedList,
  ListItem,
  ChakraBaseProvider,
} from "@chakra-ui/react";
import { type Bucket } from "./types";

interface BucketViewProps {
  bucket: Bucket;
}

const Inspector = ({ events }: any) => {
  if (events.length === 0) {
    return (
      <VStack bg="gray.200" w={350} p={10} h="calc(100vh)">
        <Text fontWeight="bold">Waiting for events...</Text>
        <Text>Inbound events will appear here for inspection</Text>
      </VStack>
    );
  }

  return (
    <VStack bg="whiteAlpha.300">
      <Text>Show events</Text>
    </VStack>
  );
};

const BucketInfo = ({ bucket }: any) => {
  return (
    <Card width="100%">
      <CardHeader>
        <Heading size="md">Bucket info</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Bucket URL
            </Heading>
            <Text pt="2" fontSize="sm">
              PUT BUCKET URL HERE
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase" mb={2}>
              Instructions
            </Heading>
            <OrderedList pl={2}>
              <ListItem>
                Register the above endpoint with your webhook service
              </ListItem>
              <ListItem>Subscribe to relevant events</ListItem>
              <ListItem>Trigger the webhook events</ListItem>
              <ListItem>Inspect the request in terminal</ListItem>
            </OrderedList>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

const PrettyPrintJSON = ({data}: any) => {
  return (
    <Box>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </Box>
  )
}

const RequestView = ({ event }: any) => {
  return (<Card w='100%'>
    <CardHeader>
      <Heading size='md'>Request details</Heading>
    </CardHeader>
    <CardBody>
      <PrettyPrintJSON data={event.data} />
    </CardBody>
  </Card>
)}

const BucketView = ({ bucket }: BucketViewProps) => {
  return (
    <Box>
      <HStack align="start">
        <Inspector events={bucket.events}></Inspector>
        <VStack w='100%'>
          <BucketInfo bucket={bucket}></BucketInfo>
          <RequestView event={{ data: { hello: 'this is data' }}}></RequestView>
        </VStack>
      </HStack>
    </Box>
  );
};

export default BucketView;
