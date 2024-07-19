import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Avatar } from "@chakra-ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

const UserPost = ({ likes, replies, postImg, caption }) => {
  const [liked, setLiked] = useState();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <Link to={"/markzukerberg/post/1"} onClick={(e) => e.stopPropagation()}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="Mark Zukerburg" src="/zuck-avatar.png" />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size="xs"
              name="John doe"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left="15px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="John doe"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              bottom={"0px"}
              right="-5px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="John doe"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              bottom={"0px"}
              left="4px"
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Mark Zukerburg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>

              <Menu isOpen={showMenu} onClose={() => setShowMenu(false)}>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDots />}
                  onClick={toggleMenu}
                  variant="link"
                />
                <MenuList>
                  {/* <MenuItem></MenuItem> */}
                  <MenuItem>Save</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Block</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {/* <Text>{caption}</Text> */}
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid "}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}
          <Flex gap={4} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize="sm">
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
