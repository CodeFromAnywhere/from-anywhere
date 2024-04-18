/**
The key, groupName, is a slug of a group, or a wildcard (*) for all groups

The value should be a concatenation of all operations permitted in this dataset.

- C for create
- R for read
- U for update
- D for delete

Example: `{ "cfa": "CRUD" }` would say that this dataset can be fully altered and read by the "cfa" group

For `Dataset`s this should be applied through the database.

For database models, this should be applied in frontmatter, like this:

```
---
authorizations: cfa:crud, public:r
---
```

The above applies on the database. 

For functions, see StandardFunctionConfig

For memory (text), you can apply authorizations in frontmatter of the markdown, in the same way as you can for data (canRead/canWrite are the only ones needed).

NB: In a later stage we may add more permissions like "isSearchable (S)"

*/
export type GroupAuthorizationObject = {
  [groupName: string]: string;
};
