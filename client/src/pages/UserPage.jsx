import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
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
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user) {
    return null;
  }

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes="236"
        replies="456"
        postImg="/post1.png"
        caption="This is my first Post"
      />
      <UserPost
        likes="1.1M"
        replies="456"
        postImg="/post2.png"
        caption="Hey there this is my new video"
      />
      <UserPost
        likes="236.2K"
        replies="456"
        postImg="/post3.png"
        caption="It's Elon Musk"
      />
      <UserPost likes="24" replies="45676" caption="This is my first Post" />
    </>
  );
};

export default UserPage;
