import { Storing } from "../model-types/index.js";
import type { HonoRequest } from "hono";
import { StandardFunctionConfig } from "./StandardFunctionConfig.js";
import { StandardContext } from "./StandardContext.js";
/**
 * Should be attached as first argument of the function, if the name of the function is in the format of:
 *
 * - `xyzWithContext`: attaches all context
 * - `xyzWithContextRaw`: attaches all context, api returns just the result of the function without wrapping it in the `RealApiReturnType`. Needed in case you have a different server.js `server.reply`
 *
 * For more info see `apiConvention`
 */
export type FunctionContext = {
  config?: StandardFunctionConfig;
  /**
   * Device from authToken, augmented with `currentPersonCalculated`, which also contains all groups.
   *
   * TODO: can't get this thing
   */
  device: Storing<any>;

  /**
   * Original context coming from Request
   *
   * NB: due to indexation problems the type has been removed. It can be casted to the `Context` type, which you can import from:
   *
   * ```ts
   * import { Context } from "types";
   * ```
   *
   */
  request?: Request | HonoRequest;

  /**
   * DEPRECATED: should use device.authToken, no duplication needed, only causes confusion and potentially bugs.
   */
  authToken?: string;
} & StandardContext;
