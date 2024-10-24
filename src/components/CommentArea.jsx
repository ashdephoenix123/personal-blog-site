import Image from "next/image";
import React, { Fragment } from "react";

const CommentArea = ({ author, comment }) => {
  return (
    <Fragment>
      <div className="flex gap-2">
        <Image
          src="/images/user.jpeg"
          alt=""
          width={100}
          height={100}
          className="object-cover rounded-full size-8"
        />
        <div className="bg-white bg-opacity-10 p-2 rounded-lg w-full">
          <span className="font-semibold tracking-wide mb-2 block">
            {author}
          </span>
          <p className="text-sm">{comment}</p>
        </div>
      </div>
      <div className="flex gap-3 ms-12">
        <Image
          src="/images/heart-empty.svg"
          alt=""
          width={100}
          height={100}
          className="size-5 cursor-pointer"
        />
        <Image
          src="/images/comment-box.svg"
          alt=""
          width={100}
          height={100}
          className="size-5 cursor-pointer"
        />
      </div>
    </Fragment>
  );
};

export default CommentArea;
