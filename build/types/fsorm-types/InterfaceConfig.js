const makeFunction = (fn, output, ...input) => {
    return fn;
};
const genders = ["male", "female"];
export const testInterfaceConfig = {
    slug: "TestInterface",
    propertyConfiguration: {
        names: { type: "string", isArray: true, maybeUndefined: true },
        age: { type: "number", maybeNull: true },
        gender: { enum: genders, maybeNull: true, maybeUndefined: true },
        genderImage: {
            type: "string",
            // assetConfig: {
            //   type: "image",
            //   relativeLocation: "./gender.png",
            //   isMultiple: false,
            // },
            getValue: (item) => searchGoogleImagesFirstResult(item.gender),
            fieldDependencies: ["gender"],
            onChangeDependantBehavior: "reset",
            comment: "It generates from google",
        },
        testInterface: {
            interfaceSlug: "TestInterface",
            maybeUndefined: true,
            // isArray: true,
        },
    },
};
const searchGoogleImagesFirstResult = async (gender) => {
    return {};
};
//# sourceMappingURL=InterfaceConfig.js.map