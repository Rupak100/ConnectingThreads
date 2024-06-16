import { useToast } from "@chakra-ui/toast";
import React, { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        duration: 3000,
        inClosable: true,
      });
    },
    [toast]
  );
  return showToast;
};

export default useShowToast;
