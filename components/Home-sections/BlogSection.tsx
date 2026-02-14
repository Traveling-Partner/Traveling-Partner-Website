"use client";
import React, { Suspense } from "react";
import BlogSlider from "../BlogSlider";

export default function BlogSection(): React.ReactElement {
  return (
    <div className="w-full pb-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] max-md:pb-5">
      <div className="flex flex-col items-center text-center">
        <h1 className="uppercase text-[50px] font-semibold pt-10 max-md:text-[30px]">
          Our Blog And News
        </h1>
        <p className="text-base pb-10 max-md:px-8">
          Explore travel tales, tips, and updates from our community. Get inspired and join the journey today!
          <br /> From breathtaking landscapes to hidden gems, let's make memories together.
        </p>
      </div>
      <div className="flex justify-center">
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <BlogSlider />
        </Suspense>
      </div>
    </div>
  );
}