import { Box, Text, VStack } from '@chakra-ui/react'
import React from "react"
import BrandButton from './BrandButton'
import BucketsTable from './BucketsTable'
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import routes from "../constants/routes"

const BucketsView = () => {
  const [buckets, setBuckets] = useState([]);
  const router = useRouter()

  const getBuckets = async() => {
    try {
      const buckets = await axios.get(routes.GET_BUCKETS)
      setBuckets(buckets.data)
    } catch (err: any) {
      router.push("/")
    }
  }

  useEffect(() => {
    getBuckets()
  }, [])
  
  const handleCreateBucket = () => {
    fetch(routes.GET_BUCKETS, { method: 'POST', credentials: 'include' })
      .then(response => {
        return response.json();
      }).then(bucket => {
        if (bucket) {
          setBuckets(buckets.concat(bucket))
        } else {
          router.push("/")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (buckets.length === 0) {
    return (
      <Box>
        <VStack spacing={5}>
          <Text>You have no buckets yet</Text>
          <BrandButton type="secondary" onClick={handleCreateBucket}>Create a Bucket</BrandButton>
        </VStack>
      </Box>
    )
  } else {
    return (
      <Box>
        <BrandButton type="secondary" onClick={handleCreateBucket}>Create a Bucket</BrandButton>
        <BucketsTable buckets={buckets}></BucketsTable>
      </Box>
    )
  }

}

export default BucketsView
