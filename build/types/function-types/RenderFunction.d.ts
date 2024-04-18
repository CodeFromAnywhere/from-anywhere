import { FunctionClassification } from "./FunctionClassification.js";
import { StandardFunctionConfig } from "./StandardFunctionConfig.js";
/**
Special type of miracle function for rendering react stuff on the frontend

Can be used to render a `Person` for example:

```ts
const PersonRenderer: RenderFunction<Person> = (props)=>{
    return <div>{props.item.name}</div>
}
```
 */
export type RenderFunction<TInstance = any, TContext = any> = {
    (props: {
        item: TInstance;
        context?: TContext;
    }): React.ReactNode;
    config?: StandardFunctionConfig;
    /**
     * Type of render function. Useful to classify the different functions we have in the frontend, and to possibly render them programatically in different places.
     */
    classification?: FunctionClassification;
};
//# sourceMappingURL=RenderFunction.d.ts.map