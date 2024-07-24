import { Flex, Image, useColorMode, Link, Heading } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "./../atom/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Button } from "@chakra-ui/button";
import { RxAvatar } from "react-icons/rx";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atom/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("login")}
        >
          Login
        </Link>
      )}
      <Heading
        as="h3"
        cursor="pointer"
        onClick={toggleColorMode}
        color={colorMode === "dark" ? "white" : "black"}
        fontSize={{
          base: "md", // Font size on small screens (mobile)
          sm: "lg", // Font size on medium screens (tablet)
          md: "xl", // Font size on large screens (desktop)
          lg: "2xl", // Font size on extra-large screens (large desktop)
        }}
      >
        ConnectingThreads
      </Heading>

      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={24} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={24} />
          </Link>
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Signup
        </Link>
      )}
    </Flex>
  );
};

export default Header;
