import React from "react";
import { Button } from "@chakra-ui/react";

import { BrandButtonProps } from "../types";

const BrandButton = (props: BrandButtonProps) => {
  if (props.type === "secondary") {
    return (
      <Button colorScheme="teal" bg="purple" color="white" variant="solid" onClick={props.onClick}>
        {props.children}
      </Button>
    );
  } 

  if (props.type === "share") {
    return (
      <Button 
      colorScheme="teal" bg="purple" color="white" variant="solid" onClick={props.onClick}
      marginLeft="15px"
      >
        {props.children}
      </Button>
    )
  }

  return (
    <Button bg='white' color='black' variant='solid' onClick={props.onClick}>
      {props.children}
    </Button>
  )
};

export default BrandButton;
