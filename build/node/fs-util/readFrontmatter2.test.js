import { readFrontmatter } from "./readFrontmatter.js";
import { frontmatterParseToString } from "frontmatter-util";
readFrontmatter("/Users/king/os/packages/_actionschema/os-web/public/domains/gptwizards.nl/index.md").then((result) => {
    if (!result?.frontmatter) {
        return;
    }
    console.log(result.frontmatter, frontmatterParseToString(result.frontmatter));
});
//# sourceMappingURL=readFrontmatter2.test.js.map