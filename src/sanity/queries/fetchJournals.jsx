import { client } from "../lib/client";

export const fetchJournals = async (start = 0, end, slug) => {
  const range = end ? `[${start}...${end}]` : ``;
  const query = `*[_type == "journal"  ${slug ? `&& slug.current != $slug` : ""}] | order(_createdAt desc) ${range} {_id, title, description, "slug": slug.current}`;
  const params = slug ? { slug } : {};

  const posts = await client.fetch(query, params);
  return posts;
};
