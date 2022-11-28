import { type AnyRouter, type inferRouterContext } from "@trpc/server";
import { type ResponseMetaFn } from "@trpc/server/dist/http/internals/types";

export type createSolidAPIHandlerContext = {
  req: Request;
  res: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers: Record<string, any>;
  };
};
export type CreateContextFn<TRouter extends AnyRouter> = (
  ctx: createSolidAPIHandlerContext
) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;

export type ICreateProps<TRouter extends AnyRouter> = {
  router: TRouter;
  createContext: CreateContextFn<TRouter>;
};

export type ICreateSolidAPIHandlerOpts<TRouter extends AnyRouter> = {
  router: TRouter;
  createContext: CreateContextFn<TRouter>;
  responseMeta?: ResponseMetaFn<TRouter>;
};
