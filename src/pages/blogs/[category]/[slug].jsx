import ContentView from "@/components/ContentView";
import Comments from "@/components/Comments";
import MoreArticles from "@/components/MoreArticles";
import { fetchAllPost, fetchPost } from "@/sanity/queries/fetchPost";
import Head from "next/head";

export default function Blog({ post, allPosts }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.subTitle} />
      </Head>
      <div>
        <ContentView key={post.title} post={post} />
        {/* <Comments postId={post._id} /> */}
        <MoreArticles articles={allPosts} />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const [allPosts, post] = await Promise.all([
    fetchAllPost(0, 3, query.slug),
    fetchPost(query.slug),
  ]);
  return { props: { post, allPosts } };
}
