import { Frontmatter } from "../../types/matter-types";
import { fs } from "./fs.js";
import { path } from "./path.js";
import { readFilePerLine } from "./readFilePerLine.js";
/**
Attempt to make a hyper efficient way to read frontmatter at the beginning of a file.

Should close if:

- there's no frontmatter dashes at the first line
- after the frontmatter ends (second frontmatter dashes line)
- after finding a syntax error in the frontmatter

 */
export const readFrontmatter = async (absoluteFilePath: string) => {
  if (!fs.existsSync(absoluteFilePath)) return;
  if (path.parse(absoluteFilePath).ext.toLowerCase() !== ".md") {
    return;
  }
  let foundFrontmatterStart = false;
  let foundFrontmatterEnd = false;

  let fullText = "";
  const frontmatter: Frontmatter = {};

  await readFilePerLine(absoluteFilePath, (line, close) => {
    if (foundFrontmatterEnd) return;

    fullText += line + "\n";

    // BASE CASE: first line
    if (!foundFrontmatterStart) {
      if (line === "---") {
        foundFrontmatterStart = true;
        // Next line
        return;
      } else {
        foundFrontmatterEnd = true;
        close();
        return;
      }
    }

    // BASE CASE: last line
    if (line === "---") {
      close();
      foundFrontmatterEnd = true;
      return;
    }

    // CASE: somewhere in the middle, could be a key-value. If not a key-value
    const [keyRaw, ...values] = line.split(":");
    const value = values.join(":").trim();
    const key = keyRaw.trim();

    if (value === undefined) {
      if (key !== undefined && key !== "") {
        // If there is a key without a value (no ":") it seems a syntax error
        close();
      }
      return;
    }

    const realValue =
      value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, value.length - 1)
        : value;

    frontmatter[key] = realValue;
  });

  return { frontmatter, fullText };
};
