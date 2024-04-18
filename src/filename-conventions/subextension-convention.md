# Subextension convention

- As much as possible, filenames should never have dots unless there is a conventionalised subextension applied
- As much as possible, the subextension should refer to a typescript interface by direct 1:1 naming. This means, also the casing needs to be 100% the same!

## Examples

- If the interface is `Person`, the file can be called `Person.json` which can either contain a single or an array of `Person` items)
- If the interface is called `ShortMarkdown`, it means that it can be stored in `*.ShortMarkdown.json`, anywhere.

# Sub-extensions

- Never name a file something with `.template` unless you're actually working in a template, because this is a templating convention! See templates documentation
- `.android`, `.ios`, `.web`, `.native` are reserved for alternative frontend files
- `.test` is reserved for test files
- `.cli` is reserved for cli files

# `*.lock`

DEPRECATED: indicates the file is locked. should be replaced by `*.status`

# `*.short.md/json` and `*.short.*.mp3/wav`

Indicates a `ShortMarkdown`, needs to be changed into `*.ShortMarkdown.md/json/mp3/wav/mp4`.

# `*.transcription.json`

Should be renamed to `*.Transcription.json`
