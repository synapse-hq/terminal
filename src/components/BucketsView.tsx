import { Box, Text, VStack } from '@chakra-ui/react'
import BrandButton from './BrandButton'
import { ReactNode } from 'react'
import BucketsTable from './BucketsTable'
import { type Bucket } from './types'

interface BucketsViewProps {
  buckets: Bucket[]
}

const BucketsView = (props: BucketsViewProps) => {
  const handleCreateBucket = () => {
    fetch('https://bruinooge.dev/api/buckets', { method: 'POST', credentials: 'include' })
      .then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
      })
  }

  if (props.buckets.length === 0) {
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
        <BucketsTable></BucketsTable>
      </Box>
    )
  }

}

export default BucketsView
