import Link from "next/link";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import BrandButton from "src/components/BrandButton";
import  {useRouter} from "next/router"

export default function NotFound() {
  const router = useRouter()
  const returnHome = () => {
    router.push("/dashboard/me")
  }
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bg="purple"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Link href="/">
        <BrandButton type="secondary" onClick={returnHome}>Go to Home</BrandButton>
      </Link>
    </Box>
  );
}
