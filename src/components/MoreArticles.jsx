import Image from "next/image";
import React from "react";
import ArticleCard from "./ArticleCard";
import { libre } from "@/app/fonts/fonts";
import Link from "next/link";
import { textToUrl } from "@/utils/helpers";
import { motion } from "framer-motion";

const MoreArticles = ({ articles }) => {
  return (
    <div className="py-24 relative">
      <Image
        src="/images/background-1.jpg"
        alt=""
        fill
        className="-z-10 object-cover hidden lg:block"
      />
      <h4 className={`text-4xl text-center mb-12 ${libre.className}`}>
        Read More Blog posts
      </h4>
      <div className="max-w-screen-lg mx-auto flex flex-col lg:grid grid-cols-3 gap-4">
        {articles.slice(0, 3).map((article, ind) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (ind % articles.length) * 0.2, duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-black bg-opacity-90"
          >
            <ArticleCard
              title={article.title}
              description={article.subTitle}
              img={{ src: article.mainImage, alt: article.title + " img" }}
              href={`/blogs/${textToUrl(article.categories[0].title)}/${article.slug}`}
            />
          </motion.div>
        ))}
      </div>
      <Link
        href="/blogs"
        className="max-w-max bg-white bg-opacity-70 hover:bg-opacity-100 text-black px-4 flex mx-auto mt-12 py-2 rounded-lg font-bold transition-all duration-200"
      >
        View all articles
      </Link>
    </div>
  );
};

export default MoreArticles;
