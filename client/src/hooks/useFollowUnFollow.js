import React, { useState } from "react";
import useShowToast from "./useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";

const useFollowUnFollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user?.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  const handleFollowAndUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please Login to follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
      console.log(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };
  return { handleFollowAndUnfollow, updating, following };
};

export default useFollowUnFollow;
