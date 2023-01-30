import { Box, Text, VStack } from '@chakra-ui/react'
import BrandButton from './BrandButton'
import { ReactNode } from 'react'
import BucketsTable from './BucketsTable'
import { type Bucket } from './types'
import axios from "axios";
import { useState, useEffect } from "react";

interface BucketsViewProps {
  buckets: Bucket[]
}


const BucketsView = ({buckets}:BucketsViewProps) => {
  const handleCreateBucket = () => {
    fetch('https://terminal.diegohernandezramirez.dev/api/buckets', { method: 'POST', credentials: 'include' })
      .then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log("FROM BK VIEW", buckets)
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
