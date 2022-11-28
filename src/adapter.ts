import { type AnyRouter } from "@trpc/server";
import { type HTTPRequest } from "@trpc/server/dist/declarations/src/http/internals/types";
import { type ApiHandler, type APIEvent } from "solid-start/api/types";
import {
  type ICreateSolidAPIHandlerOpts,
  type createSolidAPIHandlerContext,
} from "./types";
import { getPath, notFoundError } from "./utils";
import { resolveHTTPResponse } from "@trpc/server/http";

export function createSolidAPIHandler<TRouter extends AnyRouter>(
  opts: ICreateSolidAPIHandlerOpts<TRouter>
): ApiHandler {
  return async (args: APIEvent) => {
    const path = getPath(args);
    if (path === null) {
      return notFoundError(opts);
    }
    const res: createSolidAPIHandlerContext["res"] = {
      headers: {},
    };
    const url = new URL(args.request.url);
    const req: HTTPRequest = {
      query: url.searchParams,
      method: args.request.method,
      headers: Object.fromEntries(args.request.headers),
      body: await args.request.text(),
    };
    const result = await resolveHTTPResponse({
      router: opts.router,
      responseMeta: opts.responseMeta,
      req,
      path,
      createContext: async () =>
        await opts.createContext?.({
          req: args.request,
          res,
        }),
    });
    const mRes = new Response(result.body, {
      status: result.status,
    });
    for (const [key, value] of Object.entries(
      result.headers ? { ...res.headers, ...result.headers } : res.headers
    )) {
      if (typeof value === "undefined") {
        continue;
      }
      if (typeof value === "string") {
        mRes.headers.set(key, value);
        continue;
      }
      for (const v of value) {
        mRes.headers.append(key, v);
      }
    }
    return mRes;
  };
}
