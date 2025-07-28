import React from "react";
import { PortableTextRenderer } from "@/utils/PortableTextRenderer";
import Image from "next/image";
import Link from "next/link";
import ShareAnArticle from "./ShareAnArticle";
import { libre } from "@/app/fonts/fonts";
import { formatDate } from "@/utils/helpers";
import { motion } from "framer-motion";

const ContentView = ({ post }) => {
  return (
    <div className={`max-w-screen-md mx-auto`}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`text-4xl mb-12 leading-normal tracking-tight ${libre.className}`}
      >
        {post.title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        <Image
          src={post.mainImage}
          alt=""
          width={2560}
          height={1440}
          sizes="100vw"
          className="object-cover rounded-lg mb-12"
        />
      </motion.div>
      <div className="flex gap-2 items-center mb-12">
        <Image
          src={post.author.image}
          alt=""
          width={100}
          height={100}
          className="object-cover rounded-full size-10"
        />
        <p className="text-sm">
          posted by &nbsp;
          <Link href="/" className="font-semibold italic underline">
            {post.author.name}
          </Link>
          &nbsp; on &nbsp;
          <span className="font-semibold">{formatDate(post.publishedAt)}</span>
        </p>
      </div>
      <section>
        <PortableTextRenderer value={post.body} />
      </section>
      <ShareAnArticle />
    </div>
  );
};

export default ContentView;
