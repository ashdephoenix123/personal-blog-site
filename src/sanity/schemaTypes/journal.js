import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const journalType = defineType({
  name: "journal",
  title: "Journal",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
});
