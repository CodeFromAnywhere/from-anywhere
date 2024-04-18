# File naming

- files containing **only** a type interface should be named with the name of the type interface (PascalCase)
- files containing **only** a (functional) component or class should be named with the name of that thing (PascalCase)
- files containing **only** a function should be named with the name of that function (camelCase)
- files containing multiple things should be named kebab-case.
- folder names are always kebab-case
- all `.md`-files should also be kebab-case

## Special folder names

- `src` contains only source code (should always be `.ts` or `.tsx`, never `.js`, `.jsx` or anything else)
- `build` contains only compiled code
- `db` contains structured data
- `assets` contains non-structured data needed in your code
- `todo` contains todos (markdown)
- `docs` contains documentation (markdown)
- `node_modules` contains node modules

# Paths

Absolute paths should only be created and used at runtime, relative paths can be stored. this prevents incorrect data from being created. The user could change the location where he stores the program overnight while not running the program. He could change the folder structure... Be careful not to trust any stored absolute paths!

Relative paths should never start with a slash

Folder paths should never end with a slash

Folders may never contain dots

## Explicit variable naming for paths:

- If a variable contains an absolute path that can be a file OR a folder, call it `xyzAbsolutePath`. xyz can be an extra description, but can also be omitted.
- If a variable contains an absolute file path, call it `xyzFilePath`
- If a variable contains an absolute folder path, call it `xyzFolderPath`
- If a variable contains a relative path, call it `abcRelativeFilePath` or `abcRelativeFolderPath`. `abc` should explain where the path is relative from.
