import { resolveHTTPResponse, AnyRouter } from "@trpc/server";
import { APIEvent, ApiHandler } from "solid-start/api/types";
import { CreateContextFn, IFixedRequest } from "./types";
import { getPath, notFoundError } from "./utils";

export function createSolidAPIHandler<TRouter extends AnyRouter>(opts: {
  router: TRouter;
  createContext: CreateContextFn<TRouter>;
}): ApiHandler {
  return async (args: APIEvent) => {
    const path = getPath(args);
    const request = <IFixedRequest>args.request;
    if (path === null) {
      return notFoundError(opts);
    }
    const { status, headers, body } = await resolveHTTPResponse({
      router: opts.router,
      req: {
        method: request.method,
        headers: request.headers,
        query: new URL(args.request.url).searchParams,
        body: await request.text(),
      },
      path,
      createContext: async () => await opts.createContext?.(args),
    });
    return new Response(body, {
      status,
      headers: headers as Record<string, string>,
    });
  };
}
