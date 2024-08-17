"use client";

import LikeButton from "@/components/LikeButton";
import { MAX_NUM_OF_LIKES } from "@/constants";
import { useState } from "react";

export default function Home() {
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [maxLikes, setMaxLikes] = useState(false);

  function handleLike() {
    if (numOfLikes < MAX_NUM_OF_LIKES) {
      setNumOfLikes(numOfLikes + 1);
    } else {
      handleLike();
    }
  }

  function handleUnlike() {
    if (numOfLikes > 0) {
      setNumOfLikes(numOfLikes - 1);
    }
  }

  function handleMaxLike() {
    setMaxLikes(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LikeButton
        numOfMyLikes={numOfLikes}
        onLike={handleLike}
        onUnlike={handleUnlike}
        onMaxLike={handleMaxLike}
      />
      {maxLikes && (
        <p className="text-red-500">
          You have reached the maximum number of likes!
        </p>
      )}
    </main>
  );
}
