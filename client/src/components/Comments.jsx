import { Flex, Box, Text } from "@chakra-ui/layout";
import { Divider } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useState } from "react";

const Comments = ({ reply, lastReply }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comments;
