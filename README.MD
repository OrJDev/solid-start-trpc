### Base

```ts
import { createSolidAPIHandler } from "solid-start-trpc";

const handler = createSolidAPIHandler({
  router: appRouter,
  createContext: () => null,
});
export const get = handler;
export const post = handler;

// for version 0.1.6 +
export const GET = handler;
export const POST = handler;
```

### Ctx

```ts
const createContext = (opts) => ({ req: opts.req, res: opts.res });
```

### Response Meta

```ts
const handler = createSolidAPIHandler({
  router: appRouter,
  createContext,
  responseMeta: ({ ctx }) => {
    if (ctx?.req.headers.get("x-random-header")) {
      return {
        headers: {
          "x-random-header": `hello-${ctx.req.headers.get("x-random-header")}`,
        },
      };
    }
    return {};
  },
});
```
