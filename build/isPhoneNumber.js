export const isPhoneNumber = (phoneNumber) => {
    const match = phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)?.[0];
    return !!match;
};
//# sourceMappingURL=isPhoneNumber.js.map