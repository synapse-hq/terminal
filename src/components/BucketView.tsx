import React from "react"

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

import { type Bucket } from "../types";
import Link from 'next/link';
import { useState, useEffect, useRef } from "react"
import axios from "axios"

import useWebSocket from 'react-use-websocket';
import { useRouter } from "next/router";
import routes from '../constants/routes'
import { useAuth } from "../hooks/use-auth";
import { authIsInitialized } from "@/assertions";

const ConnectionStatus = ({stale, updateRequests}: any) => {
  const msg = stale ? "Attempting to connect to endpoint to listen for requests" : "Listening for incoming requests" 
  const symbol = stale ? "⭕" : "🔁"
  return (
    <>
      <div className={"stale-requests-" + stale.toString()}> 
        <h3>{msg}</h3>
        <button disabled>{symbol}</button>
      </div>

      <button className="manual-request-retrieval" onClick={updateRequests}>Retrieve all requests</button>
  
    </>
  )

}

const Inspector = ({ events, view, stale, updateRequests }: any) => {
  if (events.length === 0) {
    return (
      <VStack bg="gray.200" w={350} p={10} h="calc(100vh)">
        <Text fontWeight="bold">Waiting for events...</Text>
        <Text>Inbound events will appear here for inspection</Text>
        <ConnectionStatus stale={stale} updateRequests={updateRequests}/>
      </VStack>
    );
  }

  const formatEvent = (event: any) => {
    const  {method, path, query, clientIp} = event
    let eventData = `method: ${method} | path: ${path} | source: ${clientIp}`
    return eventData
  }

  return (

    <VStack bg="whiteAlpha.300">
      <Heading>All Requests</Heading>
      <div id="event-scroll">
      {events.map((event: any) => 
        <Text key={event.id} className="scroll-item" onClick={() => view(event.id)}>
          {formatEvent(event)}
        </Text>
      )}
      </div>
      <ConnectionStatus stale={stale} updateRequests={updateRequests}/>
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
            <Text pt="2" fontSize="med">
            Make requests to your endpoint:
              </Text>
            <Heading size="xs">
              {routes.subdomainUrl(subdomain)}
            </Heading>

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
  let [rawView, setRawView] = useState(false)

  
  const display = rawView ? "show" : "hide";

  const closeRawView = () => {
    setRawView(false)
  };

  const openRawView = () => {
    setRawView(true)
  };

  return (
  <>
  <Card w='100%'>
    <CardHeader>
      <Heading size='md'>Request details</Heading>
    </CardHeader>
    <CardBody>
    <div>Method:  {event.method}</div>
        <div>Path: {event.path}</div>
        <div>Query:  {JSON.stringify(event.query)}</div>
        
        <div>Sent on:  {event.createdAt}</div>
        <div>Source IP:  {event.clientIp}</div><br></br>


        <div>
          <Heading size="xs">
            See Raw Request {" "}
            <button onClick={openRawView}>🔼</button>
          </Heading>
        </div>

        <div className={`request-inspector-modal-${rawView ? "show" : ""}`}>
          <button onClick={closeRawView}>❌</button>
            <div className={"raw-request"}>
              <PrettyPrintJSON data={event.rawRequest} />
            </div>
        </div>

    </CardBody>
  </Card>
  </>

  
)}

type BucketViewProps = {
  subdomain: string
}

const BucketView = ({subdomain}: BucketViewProps) => {
  let [access, setAccess] = useState(false)
  let [requests, setRequests] = useState<any[]>([])
  let [currentRequest, setCurrentRequest] = useState(-1)
  let [staleData, setStale] = useState(false)
  const router = useRouter()
  const auth = useAuth();
  
  try {
    authIsInitialized(auth)
  } catch(err: any) {
    console.log(err)
    router.push("/")
    return <></>;
  }

  const { sendMessage } = useWebSocket(routes.BUCKET_WS_URL, {
    onOpen: () => {
      setStale(false)
      sendMessage(subdomain)
      
      console.log('WebSocket connection established.');
    },
    onMessage: (e: any) => {
      if (access && e.data) {
        const newRequest = JSON.parse(e.data)
        setRequests(requests.concat(newRequest))
      }
    },
    onClose: (e: any) => {
      console.log("WebSocket connection closed")
    },
    shouldReconnect: (closeEvent: any) => {
      setStale(true)
      return true
    },
    reconnectAttempts: 20,
    reconnectInterval: 50,
  });


  const getRequests = async() => {
    try {
      const requests = await axios.get(routes.fetchBucketRequests(subdomain))
      setRequests(requests.data)
      setAccess(true)
    } catch (error: any) {
      if (error.response.status === 404) {
        router.push(`/404`)
        return <></>;
      } 

      if (error.response.status === 401) {
        router.push("/");
        return <></>;
      }
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  let viewing = {}
  if (currentRequest < 1) {
    viewing = { rawRequest: 'Click a request to inspect its contents' }
  } else {
    let request = requests.find(req => req.id === currentRequest)
    viewing = request
  }


  if (!access) {
    return (
      <Box>
        <HStack align="start">
          <Inspector 
            events={[]} 
            view={setCurrentRequest}
            updateRequests={getRequests}
            stale={staleData}  
          >
  
            </Inspector>
          <VStack w='100%'>
            <Link href={`/dashboard/${auth.user}`}>Back to Buckets</Link>
            <BucketInfo subdomain={subdomain}></BucketInfo>
            <RequestView event={viewing}></RequestView>
          </VStack>
        </HStack>
      </Box>
    );
  }

  return (
    <Box>
      <HStack align="start">
        <Inspector 
          events={requests} 
          view={setCurrentRequest}
          updateRequests={getRequests}
          stale={staleData}  
        >

          </Inspector>
        <VStack w='100%'>
          <Link href={`/dashboard/${auth.user}`}>Back to Buckets</Link>
          <BucketInfo subdomain={subdomain}></BucketInfo>
          <RequestView event={viewing}></RequestView>
        </VStack>
      </HStack>
    </Box>
  );
};

export default BucketView;
