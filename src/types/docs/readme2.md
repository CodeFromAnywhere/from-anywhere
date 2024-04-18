All general purpose types can go here.

Dependency hell:

Zero dependencies:

- ✅ matter-types
- ✅ recursive-types

Few Dependencies:

- ✅ fsorm-types: recursive-types
- ✅ model-types: matter-types
- ✅ geo-types: model-types
- ✅ auth-types: model-types
- ✅ asset-type: fsorm-types
- ✅ bundle-types: model-types
- ✅ schema-types: json-schema, comment-types
- ✅ types: schema-types
- ✅ comment-types: model-types, matter-types

- ❌ peer-types: fsorm-types, asset-type, model-types, social-media-types, ai-types, recursive-types, geo-types, whatsapp-util

- ❌ ai-types: model-types, fsorm-types, function-types, schema-types, recursive-types, filename-conventions, asset-type, markdown-types

- 🟠 social-media-types: fsorm-types, model-types, geo-types, asset-types

- 🟠 code-types: ?
- ✅ function-types:

USE crawlCircularDependency.test!!!!
