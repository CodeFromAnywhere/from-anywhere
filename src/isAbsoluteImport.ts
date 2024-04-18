export const isAbsoluteImport = (moduleString: string | undefined) =>
  moduleString ? !moduleString.startsWith(".") : false;
