// app/components/VideoPlayer.tsx
"use client";

import React from "react";

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, posterSrc }) => {
  return (
    <div className="relative w-full overflow-hidden h-full max-md:h-[300px]">
      <video
        controls
        poster={posterSrc}
        className="w-full h-[85%] max-md:h-[300px]"
        preload="none"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;