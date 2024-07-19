import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postAtom from "../atom/postAtom";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();

  const [posts, setPosts] = useRecoilState(postAtom);
  const [fetching, setFetchingPosts] = useState(true);
  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        showToast("Error", data.error, "error");
      } finally {
        setFetchingPosts(false);
      }
    };
    getPosts();
  }, [username, showToast, setPosts, user]);
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} height={"50vh"} alignItems={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!user && !loading) {
    return <h1>User Not found</h1>;
  }
  if (!posts) return;
  return (
    <>
      <UserHeader user={user} />
      {!fetching && posts.length === 0 && <h1>User has no posts</h1>}
      {fetching && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
