import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/userAtom";
import { Button } from "@chakra-ui/button";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Check if the response is OK
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.removeItem("user-threads");
      // localStorage.removeItem("token");
      setUser(null);

      // Redirect to auth page after logging out
      // navigate("/auth");
    } catch (error) {
      console.log(error);
      showToast("Error", "An error occurred while logging out", "error");
    }
  };

  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  );
};

export default LogoutBtn;
