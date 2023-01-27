import { Box, Text, VStack } from '@chakra-ui/react'
import BrandButton from './BrandButton'
import { ReactNode } from 'react'

interface BucketsViewProps {
  buckets: ReactNode[]
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
      <Text>Temp</Text>
    )
  }

}

export default BucketsView