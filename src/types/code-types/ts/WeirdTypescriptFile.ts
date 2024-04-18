import { DefaultModelType } from "../../model-types/index.js";
export interface WeirdTypescriptFile<
  TFiles extends {
    [fileName: string]: {
      [variableName: string]: {
        value: any;
        type: "variable" | "enum";
      };
    };
  },
  TDbQuerySelector extends { fileName: keyof TFiles },
> extends DefaultModelType {
  variables: TFiles[TDbQuerySelector["fileName"]];
}
