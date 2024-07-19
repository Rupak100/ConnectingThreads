import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("Hi there");
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        if (data.isFrozen) {
          setUser(null);
          return;
        }
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // const getPosts = async () => {
    //   setFetchingPosts(true);
    //   try {
    //     const res = await fetch(`/api/posts/user/${username}`);
    //     const data = await res.json();
    //     setPosts(data);
    //     console.log(data);
    //   } catch (error) {
    //     showToast("Error", data.error, "error");
    //   } finally {
    //     setFetchingPosts(false);
    //   }
    // };
    // getPosts();
    getUser();
  }, [username, showToast]);
  return { loading, user };
};

export default useGetUserProfile;
