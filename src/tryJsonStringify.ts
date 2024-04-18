export const tryJsonStringify = (data: any) => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (e) {
    return;
  }
};
