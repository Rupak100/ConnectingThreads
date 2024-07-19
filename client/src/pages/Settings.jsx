import { Button, Text } from "@chakra-ui/react";
import React from "react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const Settings = () => {
  const showToast = useShowToast();
  const logout = useLogout();
  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account?"))
      return;
    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      console.log("Hikdsjhlkj");
      const data = await res.json();
      console.log(data);
      if (data.error) {
        return showToast("Error", error.message, "error");
      }
      if (data.success) {
        logout();
        return showToast("Success", "Your account has been frozen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Text my={1} fontWeight={"bold"}>
        Freeze your account
      </Text>
      <Text my={1}>You can unfreeze your account anytime by login</Text>
      <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
        Freeze
      </Button>
    </>
  );
};

export default Settings;
