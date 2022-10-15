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
