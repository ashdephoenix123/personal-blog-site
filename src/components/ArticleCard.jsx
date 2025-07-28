import { libre } from "@/app/fonts/fonts";
import { formatDate } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticleCard = ({
  title,
  description,
  img,
  href,
  categories,
  author,
  publishedDate,
}) => {
  return (
    <Link href={href} className="w-full  group">
      <div className="relative w-full h-52  overflow-hidden">
        {img?.src && (
          <Image
            src={img?.src}
            alt={img?.alt}
            fill
            className="object-cover group-hover:scale-105 transition-all duration-500"
          />
        )}
      </div>
      <div className="p-6 min-h-72 bg-white bg-opacity-10 flex flex-col justify-between justify-article-height">
        <div>
          {categories && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <span
                  key={category.title}
                  style={{ backgroundColor: category.color }}
                  className="px-2 py-1 rounded-sm inline-block text-xs font-semibold tracking-wide"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
          <h4
            className={`font-bold text-lg leading-wide mb-4 ${libre.className}`}
          >
            {title}
          </h4>
          <p className="text-sm">{description}</p>
        </div>
        {author && publishedDate && (
          <p className="text-xs mt-12 flex gap-2 items-center">
            <Image
              src={author.image}
              alt={author.name + " image"}
              width={100}
              height={100}
              className="object-cover rounded-full size-6"
            />
            <span className="font-semibold italic">{author.name}</span>
            <span>posted on</span>
            <span className="font-semibold">
              {formatDate(publishedDate, { month: "short" })}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
