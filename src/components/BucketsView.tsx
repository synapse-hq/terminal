import { Box, Text, VStack } from '@chakra-ui/react'
import BrandButton from './BrandButton'
import { ReactNode } from 'react'
import BucketsTable from './BucketsTable'
import { type Bucket } from './types'

interface BucketsViewProps {
  buckets: Bucket[]
}

const BucketsView = (props: BucketsViewProps) => {
  if (props.buckets.length === 0) {
    return (
      <Box>
        <VStack spacing={5}>
          <Text>You have no buckets yet</Text>
          <BrandButton type="secondary">Create a Bucket</BrandButton>
        </VStack>
      </Box>
    )
  } else {
    return (
      <BucketsTable></BucketsTable>
    )
  }

}

export default BucketsView