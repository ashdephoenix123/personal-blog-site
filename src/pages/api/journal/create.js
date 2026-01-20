import { client } from "@/sanity/lib/client";
import slugify from "slugify";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { title, description } = req.body;

    const doc = {
      _type: "journal",
      title,
      description,
      slug: {
        _type: "slug",
        current: slugify(title + Date.now().toString(), {
          lower: true,
          strict: true,
        }),
      },
    };

    const result = await client.create(doc);

    res.status(200).json({
      success: true,
      id: result._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
