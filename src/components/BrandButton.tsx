import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BrandButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
  onClick: () => void;
}

const BrandButton = (props: BrandButtonProps) => {
  if (props.type === "secondary") {
    return (
      <Button colorScheme="teal" bg="purple" color="white" variant="solid" onClick={props.onClick}>
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button bg='white' color='black' variant='solid' onClick={props.onClick}>
        {props.children}
      </Button>
    )
  }
};

export default BrandButton;
