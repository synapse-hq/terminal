import {
  Heading,
  Box,
  VStack,
  Card,
  CardBody,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import theme from "../styles/theme";
import {
  FaGithub,
  FaSlack,
  FaTwitter,
  FaAws,
  FaSpotify,
  FaStripe,
} from "react-icons/fa";

const brands = [
  { name: "github", icon: { as: FaGithub, color: "black" } },
  { name: "stripe", icon: { as: FaStripe, color: theme.colors.stripe } },
  { name: "slack", icon: { as: FaSlack, color: "white" } },
  { name: "twitter", icon: { as: FaTwitter, color: theme.colors.twitter } },
  { name: "aws", icon: { as: FaAws, color: "orange" } },
  { name: "spotify", icon: { as: FaSpotify, color: theme.colors.spotify } },
];

const BrandCard = (props: any) => {
  return (
    <Card bg="gray.700" align="center">
      <CardBody>{props.children}</CardBody>
    </Card>
  );
};

const Integrations: React.FC = () => {
  return (
    <Box py={20} bg="black" color="white">
      <VStack spacing={20}>
        <Heading textAlign="center">Integrates with 100s of Services</Heading>
        <SimpleGrid columns={{ base: 1, md: 6 }} spacing={10}>
          {brands.map((brand) => {
            return (
              <BrandCard>
                <Icon
                  color={brand.icon.color}
                  boxSize={12}
                  as={brand.icon.as}
                ></Icon>
              </BrandCard>
            );
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Integrations;
