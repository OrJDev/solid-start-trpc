import { AnyRouter, TRPCError } from "@trpc/server";
import { TRPCErrorResponse } from "@trpc/server/rpc";
import { APIEvent } from "solid-start/api/types";
import { ICreateSolidAPIHandlerOpts } from "./types";

export function getPath(args: APIEvent): string | null {
  const p: any = args.params.trpc;
  if (typeof p === "string") {
    return p;
  }
  if (Array.isArray(p)) {
    return p.join("/");
  }
  return null;
}

export function notFoundError<TRouter extends AnyRouter>(
  opts: ICreateSolidAPIHandlerOpts<TRouter>
) {
  const error = opts.router.getErrorShape({
    error: new TRPCError({
      message:
        'Query "trpc" not found - is the file named `[trpc]`.ts or `[...trpc].ts`?',
      code: "INTERNAL_SERVER_ERROR",
    }),
    type: "unknown",
    ctx: undefined,
    path: undefined,
    input: undefined,
  });
  const json: TRPCErrorResponse = {
    id: -1,
    error,
  };
  return new Response(JSON.stringify(json), { status: 500 });
}
