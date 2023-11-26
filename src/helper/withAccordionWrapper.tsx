import React, { ReactNode } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const withAccordionWrapper = (shouldWrap: boolean, component: ReactNode) => {
  if (shouldWrap) {
    return (
      <Accordion defaultIndex={[]} allowMultiple className="w-full">
        <AccordionItem className="bg-low-bg">
          <h2>
            <AccordionButton className="flex w-full">
              <Box
                as="div"
                flex="1"
                className="flex w-full justify-between"
                textAlign="left"
              >
                <div>Details</div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="flex flex-col">
            {component}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  } else {
    return component;
  }
};

export default withAccordionWrapper;
