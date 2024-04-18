import { Frontmatter } from "../../types/matter-types/index.js";
/**
Attempt to make a hyper efficient way to read frontmatter at the beginning of a file.

Should close if:

- there's no frontmatter dashes at the first line
- after the frontmatter ends (second frontmatter dashes line)
- after finding a syntax error in the frontmatter

 */
export declare const readFrontmatter: (absoluteFilePath: string) => Promise<{
    frontmatter: Frontmatter;
    fullText: string;
} | undefined>;
//# sourceMappingURL=readFrontmatter.d.ts.map