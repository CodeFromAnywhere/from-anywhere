import { notEmpty } from "../../general.js";
import { fs } from "./fs.js";
import { path } from "./path.js";
import { readFrontmatter } from "./readFrontmatter.js";
/**
test cases, measure performance:

- big file (1mb) without frontmatter
- big file (1mb) with correct frontmatter
- big file (1mb) with frontmatter with syntax error
- same with small files

TODO:

Implement test

If this works, I can also do many performance improvements for fs-orm, for both read but also for updates. Ideas:

- reading JSON arrays item per item, closing early if a condition is met
- mapping JSON arrays item per item, closing early if a condition is met
- updating/reading kvmd storage
- updating frontmatter
- crud csv

Research more first, thinks like a JSONStream could greatly simplify implementation for this, as well as understanding such code.

 */
const test = async () => {
  const folder =
    "/Users/king/os/packages/_actionschema/os-web/public/domains/karsens.com/blogs-2016-2022";

  const files = fs.readdirSync(folder);

  const nonPublished = (
    await Promise.all(
      files.map(async (name) => {
        const p = path.join(folder, name);

        const result = await readFrontmatter(p);

        if (!result) {
          return;
        }
        if (result?.frontmatter.publishedAt === "0") {
          return p;
        }
      }),
    )
  ).filter(notEmpty);

  console.log({ nonPublished });

  await Promise.all(
    nonPublished.map((p) => {
      return fs.rename(
        p,
        path.join(
          "/Users/king/os/packages/control-fs/fs-util/assets",
          path.parse(p).base,
        ),
      );
    }),
  );
  // 1) create the files in /assets
  // 2) use one by one, use `readFrontmatter` for every file, while measuring time
};

test();
