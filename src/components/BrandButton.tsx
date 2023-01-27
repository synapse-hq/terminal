import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BrandButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
}

const BrandButton = (props: BrandButtonProps) => {
  if (props.type === "secondary") {
    return (
      <Button colorScheme="teal" bg="purple" color="white" variant="solid">
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button bg='white' color='black' variant='solid'>
        {props.children}
      </Button>
    )
  }
};

export default BrandButton;
