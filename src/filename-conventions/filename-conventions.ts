/**
 * Not regulated regarding file naming conventions
 */
export const unregulatedFolders = [
  "installation",
  "cloned",
  "bundled",
  "backups",
  "to-integrate",
  "browser-sessions",
  "legacy",
  // this is a big exception with block quotes and triple dot names
  "pages",
  // TODO: not regulated because it is automated and should be good (however, there's this one little thing: namedParameters<xyz>)
  "db",
  "src",
  // wordpress stuff
  "wp-content",
  "wp-admin",
  "wp-includes",
  "metadata",
  "wwwroot",
  "phonegap",
  "httpdocs",
  ".index",
];
export const buildFolderName = "build";
export const databaseFolderName = "db";
export const sourceFolderName = "src";
// NB: not included in generated
export const indexFolderName = ".index";

export const nodeModulesFolderName = "node_modules";
export const nextBuildFolderName = ".next";
export const gitFolderName = ".git";
export const turboFolderName = ".turbo";

export const generatedFolders = [
  buildFolderName,
  nodeModulesFolderName,
  nextBuildFolderName,
  gitFolderName,
  turboFolderName,
];

export const ignorableFilenames = {
  dsStore: ".DS_Store",
  htaccess: ".htaccess",
  iconFile: "Icon\r",
};

export const folderNames = {
  buildFolderName,
  databaseFolderName,

  sourceFolderName,
  nodeModulesFolderName,
  nextBuildFolderName,
  gitFolderName,
  turboFolderName,
};

const projectRelativeToolsPath = "packages";

export const ignorableFileAndFolderNames =
  Object.values(ignorableFilenames).concat(generatedFolders);
/**
 * subextension indicating that a file has been moved to another location
 *
 * For example, used in `watchAppleMemos`
 */
export const movedFileSubextension = "moved";
/**
 * This is a temporary file for conversion with ffmpeg (see ffmpeg-util)
 */
export const temporaryConvertedSubextension = "converted";

export const projectRelativeGeneratedOperationsFolder = `${projectRelativeToolsPath}/generated`;

/**
 * these special operations are generated, so should not be copied, but should be generated in the bundle after everything is copied
 */

export const frontendOptionalFileSubExtensions = [
  "native",
  "ios",
  "android",
  "web",
];

export const cliFileExtension = "cli";
export const testFileExtension = "test";

export const operationUnindexableNamesOrSubExtensions = ["cli", "test"];

export const subExtensions = {
  cliFileExtension,
  testFileExtension,
};

export const possibleSubExtensions = [
  "cli",
  "test",
  "native",
  "ios",
  "android",
  "web",
  "ActionStatus",
  "transcription",
  "Transcription",
  "MarkdownIndex",
  "drawio",
  "schema", //used for .schema.json files
  "template", //used for templates
  // deprecated
  "wav",
  "clean",
  "todo",
  "index", //replaced with MarkdownIndex
];
/**
 * All filesystem conventions in a single object for easy access
 */
export const fileSystemConventions = {
  folderNames,
  subExtensions,
};
