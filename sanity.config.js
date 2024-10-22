"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { media } from "sanity-plugin-media";
import { RocketIcon } from "@sanity/icons";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
  ],
  tools: (prev, context) => {
    console.log(context); // logs { getClient, currentUser, schema, projectId, dataset}
    return [
      {
        name: "my-tool",
        title: "My super-cool tool",
        icon: RocketIcon,
        component: (props) => <div>I am a tool, albeit not a useful one</div>,
      },
      ...prev, // remember to include previous values
    ];
  },
});
