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

import Link from 'next/link';
import { useState, useEffect } from "react"
import bucketsContext from "@/context/buckets";
import axios from "axios"

const domain = "https://terminal.diegohernandezramirez.dev/api/"

import useWebSocket from 'react-use-websocket';
const WS_URL = 'wss://terminal.diegohernandezramirez.dev/api/socket/buckets';


// interface BucketViewProps {
//   bucket: Bucket;
// }

const Inspector = ({ events }: any) => {
  if (events.length === 0) {
    return (
      <VStack bg="gray.200" w={350} p={10} h="calc(100vh)">
        <Text fontWeight="bold">Waiting for events...</Text>
        <Text>Inbound events will appear here for inspection</Text>
      </VStack>
    );
  }

  const formatEvent = (event: any) => {
    const  {method, path, query, clientIp} = event
    let eventData = `method: ${method} | path: ${path} | source: ${clientIp}`
    return eventData
  }

  console.log("EVENTS", events)
  return (

    <VStack bg="whiteAlpha.300">
      {events.map((event: any) => 
        <li>
          {formatEvent(event)}
        </li>
      )}
    </VStack>
  );
};

const BucketInfo = ({subdomain}: {subdomain: string}) => {
  return (
    <Card width="100%">
      <CardHeader>
        <Heading size="md">Bucket info</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {subdomain}
            </Heading>
            <Text pt="2" fontSize="sm">
              {subdomain}
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

type BucketViewProps = {
  subdomain: string
}

const BucketView = ({subdomain}: BucketViewProps) => {
  let [requests, setRequests] = useState<any[]>([])
  let [currentRequest, setCurrentRequest] = useState({ data: { hello: 'this is data' }})

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    getWebSocket,
  } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
      sendMessage(subdomain)
    },
    onMessage: (e: any) => {
      console.log(e)
      console.log(e.message)
    }
  });
  
  const getrequests = async() => {
    console.log("IN INITIAL FETCH", subdomain)
    try {
      const requests = await axios.get(domain + "requests/" + subdomain)
      console.log(requests)
      setRequests(requests.data)
    } catch (err) {
      console.log(err)
    }
  }

  // setTimeout(() => {
  //   sendJsonMessage({
  //     subdomain,
  //     count: requests.length
  //   })
  //   console.log("JSON", lastJsonMessage)

  //   if (lastJsonMessage && lastJsonMessage.length) {
  //     let reqs = lastJsonMessage as any[]
  //     setRequests(reqs)
  //   }
  // }, 6000)

  useEffect(() => {
    console.log("EFFECT")
    getrequests()
    // setrequests(["TESTTESTS"])
  }, [])

  return (
    <Box>
      <Link href="/dashboard/me">Back to Buckets</Link>
      <HStack align="start">
        <Inspector events={requests}></Inspector>
        <VStack w='100%'>
          <BucketInfo subdomain={subdomain}></BucketInfo>
          <RequestView event={currentRequest}></RequestView>
        </VStack>
      </HStack>
    </Box>
  );
};

export default BucketView;
