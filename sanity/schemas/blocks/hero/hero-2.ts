// sanity/schemas/blocks/hero/hero-2.ts
import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

import {
  HERO_TITLE_FONT_FAMILY,
  HERO_TITLE_FONT_SIZE,
  HERO_TITLE_FONT_WEIGHT,
} from "../shared/layout-variants";

export default defineType({
  name: "hero-2",
  title: "Hero 2",
  type: "object",
  icon: LayoutTemplate,
  fields: [
    defineField({
      name: "tagLine",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "titleStyle",
      title: "Title Typography",
      type: "object",
      options: { columns: 2 },
      fields: [
        defineField({
          name: "fontFamily",
          title: "Font Family",
          type: "string",
          options: {
            list: HERO_TITLE_FONT_FAMILY.map(({ title, value }) => ({
              title,
              value,
            })),
            layout: "radio",
          },
          initialValue: "display",
        }),
        defineField({
          name: "fontWeight",
          title: "Font Weight",
          type: "string",
          options: {
            list: HERO_TITLE_FONT_WEIGHT.map(({ title, value }) => ({
              title,
              value,
            })),
            layout: "radio",
          },
          initialValue: "bold",
        }),
        defineField({
          name: "fontSize",
          title: "Font Size",
          type: "string",
          options: {
            list: HERO_TITLE_FONT_SIZE.map(({ title, value }) => ({
              title,
              value,
            })),
            layout: "radio",
          },
          initialValue: "md",
        }),
      ],
    }),
    defineField({
      name: "body",
      type: "block-content",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "link" }],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero 2",
        subtitle: title,
      };
    },
  },
});
