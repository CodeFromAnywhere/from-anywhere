/**
Should replace `LockInfo`

JSON that shows status of something that is in progress or that affects something. For example, if a conversion is happening, it can contain something like this:

```json
{ "status": "busy", "updatedAt": 123456789 }
```

The file can then be locked. If an error has occured, and the file should be locked because you don't want to try infinitely, you can set it to something like this:

```json
{
  "status": "error",
  "updatedAt": 123456789,
  "functionName": "xyz",
  "parameters": ["parameterOneValue", "parameterTwoValue"]
}
```
 */
export interface ActionStatus {
    /**
     * Status of the action
     */
    status: "busy" | "error";
    /**
     * Markdown indicating more info about the status
     */
    message?: string;
    /**
     * Function initiating the action
     */
    functionName?: string;
    /**
     * Parameters that went into the function (optional)
     */
    parameters?: any[];
    updatedAt: number;
    updatedTime?: string;
    updatedDate?: string;
    /**
     * Unix timestamp when this status should be removed due to it being irrelevant (not required)
     */
    cleanupAt?: number;
}
//# sourceMappingURL=ActionStatus.d.ts.map