import { resolveHTTPResponse, AnyRouter, Dict } from "@trpc/server";
import { ResponseMetaFn } from "@trpc/server/dist/declarations/src/http/internals/types";
import { APIEvent, ApiHandler } from "solid-start/api/types";
import {
  CreateContextFn,
  createSolidAPIHandlerContext,
  IFixedRequest,
} from "./types";
import { getPath, notFoundError } from "./utils";

export function createSolidAPIHandler<TRouter extends AnyRouter>(opts: {
  router: TRouter;
  createContext: CreateContextFn<TRouter>;
  responseMeta?: ResponseMetaFn<TRouter>;
}): ApiHandler {
  return async (args: APIEvent) => {
    const path = getPath(args);
    const request = <IFixedRequest>args.request;
    if (path === null) {
      return notFoundError(opts);
    }
    const res: createSolidAPIHandlerContext["res"] = {
      headers: {},
    };
    const { status, headers, body } = await resolveHTTPResponse({
      router: opts.router,
      responseMeta: opts.responseMeta,
      req: {
        method: request.method,
        headers: request.headers,
        query: new URL(args.request.url).searchParams,
        body: await request.text(),
      },
      path,
      createContext: async () =>
        await opts.createContext?.({
          req: args.request,
          res,
        }),
    });
    return new Response(body, {
      status,
      headers: (headers
        ? { ...res.headers, ...headers }
        : res.headers) as Record<string, string>,
    });
  };
}
