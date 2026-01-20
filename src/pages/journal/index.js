import React, { useCallback, useState } from "react";
import { libre } from "../../app/fonts/fonts";
import ArticleCard from "@/components/ArticleCard";
import {
  fetchAllPost,
  fetchCategoryPost,
  fetchPostsLength,
} from "@/sanity/queries/fetchPost";
import AutoComplete from "@/components/AutoComplete";
import { fetchAllCategories } from "@/sanity/queries/fetchCategories";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import Head from "next/head";
import { textToUrl } from "@/utils/helpers";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import JournalCard from "@/components/JournalCard";
import Modal from "@/components/Modal";
import { journals } from "@/database/content";

let numOfBlogsToLoad = 6;

const Journal = ({ posts, numOfBlogs }) => {
  const router = useRouter();
  const [allBlogs, setAllBlogs] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [blogsLength, setBlogsLength] = useState(numOfBlogs);
  const [startBlogIndex, setStartBlogIndex] = useState(numOfBlogsToLoad);
  const [modal, setModal] = useState(null);

  const openModal = (details) => {
    setModal(details);
  };

  const fetchCategoryBlog = async (slug) => {
    let param = slug ? `?category=${slug}` : ``;
    try {
      if (selectedCategory?.slug === slug) return;
      setLoading(true);
      const [data, allDataLength] = await Promise.all([
        fetchCategoryPost(slug ? slug : null, 0, numOfBlogsToLoad),
        fetchPostsLength(slug),
      ]);
      setAllBlogs(data);
      setBlogsLength(allDataLength);
      setStartBlogIndex(numOfBlogsToLoad);
      router.push(`/blogs${param}`, undefined, { shallow: true });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Please try later!");
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreBlogs = async () => {
    try {
      setLoadMore(true);
      const data = await fetchCategoryPost(
        typeof selectedCategory === "object" ? selectedCategory.slug : null,
        startBlogIndex,
        startBlogIndex + numOfBlogsToLoad,
      );
      setStartBlogIndex((prev) => prev + numOfBlogsToLoad);
      setAllBlogs((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Please try later!");
    } finally {
      setLoadMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>Journal - Web Journal</title>
        <meta
          name="description"
          content="Explore the Journal section of Web Journal. Here, I list down my daily updates on what I learned or working on."
        />
      </Head>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex gap-4 items-center">
          <h1 className={`text-4xl ${libre.className}`}>My Daily Updates</h1>
        </div>
        <div className="mx-auto flex flex-col lg:grid grid-cols-5 gap-4 my-12">
          {loading ? (
            <Loader />
          ) : (
            journals.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % allBlogs.length) * 0.2,
                }}
                viewport={{ once: true }}
              >
                <JournalCard
                  title={article.title}
                  description={article.body}
                  action={() => openModal(article)}
                />
              </motion.div>
            ))
          )}
        </div>
        {loadMore && <Loader />}
        <button
          disabled={allBlogs.length == blogsLength || loading}
          onClick={fetchMoreBlogs}
          className="disabled:bg-opacity-30 disabled:cursor-not-allowed max-w-max my-24 bg-white bg-opacity-70 hover:bg-opacity-100 text-black px-4 flex mx-auto mt-12 py-2 rounded-lg font-bold transition-all duration-200"
        >
          Load more
        </button>
      </div>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title}
        content={modal?.body}
      />
    </>
  );
};

export async function getServerSideProps() {
  const [posts, numOfBlogs, allCategories] = await Promise.all([
    fetchAllPost(0, numOfBlogsToLoad),
    fetchPostsLength(null),
    fetchAllCategories(),
  ]);
  return { props: { posts, allCategories, numOfBlogs } };
}

export default Journal;
