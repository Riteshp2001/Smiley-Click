"use client";

import LikeButton from "@/components/LikeButton";
import LikeCount from "@/components/ContentLikeButton/LikeCount";
import { MAX_NUM_OF_LIKES } from "@/constants";
import { useState, useEffect } from "react";

export default function Home() {
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [maxLikes, setMaxLikes] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  function handleLike() {
    if (numOfLikes < MAX_NUM_OF_LIKES) {
      setNumOfLikes(numOfLikes + 1);
    } else {
      handleMaxLike();
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

  function generateRandomPosition() {
    // Get the user's current scroll position
    let range = window.innerWidth;
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    // Define the viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Determine the bounds within which the button can appear
    const minTop = Math.max(0, scrollTop + viewportHeight / 2 - range);
    const maxTop = Math.min(
      scrollTop + viewportHeight - 100,
      scrollTop + viewportHeight / 2 + range
    );

    const minLeft = Math.max(0, scrollLeft + viewportWidth / 2 - range);
    const maxLeft = Math.min(
      scrollLeft + viewportWidth - 100,
      scrollLeft + viewportWidth / 2 + range
    );

    // Generate random positions within these bounds
    const top = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
    const left = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;

    return { top, left };
  }

  // useEffect(() => {
  //   const newPosition = generateRandomPosition();
  //   setPosition(newPosition);
  // }, []);

  useEffect(() => {
    const newPosition = generateRandomPosition();
    setPosition(newPosition);

    const handleScroll = () => {
      const updatedPosition = generateRandomPosition();
      setPosition(updatedPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className=" min-h-[200vh]  p-24">
      <div
        className="flex flex-row items-center absolute"
        style={{
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
        }}
      >
        <LikeButton
          numOfMyLikes={numOfLikes}
          onLike={handleLike}
          onUnlike={handleUnlike}
          onMaxLike={handleMaxLike}
        />
        {typeof numOfLikes === "number" && (
          <LikeCount numOfMyLikes={numOfLikes} numOfLikes={numOfLikes} />
        )}
      </div>
      {maxLikes && (
        <p className="text-red-500">
          You have reached the maximum number of likes!
        </p>
      )}
    </main>
  );
}
