import { ModelConfig } from "../fsorm-types";
import { OrmItem } from "../fsorm-types";
/**
Open files for different users

Besides being recent, the file can also be open and/or pinned

Name can be confusing, the file can actually also be closed or not recent. `File` just didn't seem like a good name (too general)

*/
export interface OpenFile extends OrmItem {
  personSlug: string;
  file_projectRelativePath: string;
  isPinned?: boolean;
  isOpen?: boolean;
  /**
   * The openfile be removed if not open and pinned after a certain time
   */
  openedAt: number;
}

export const openFileConfig = {
  storageLocation: `memory/persons/[personSlug]/open-files.json`,
  pathIndexKeys: ["personSlug"],
  modelName: "OpenFile",
} as const satisfies ModelConfig;