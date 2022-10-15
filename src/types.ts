import { AnyRouter, inferRouterContext, Dict } from "@trpc/server";

export type createSolidAPIHandlerContext = {
  req: Request;
  res: {
    headers: Dict<string | string[]>;
  };
};
export type CreateContextFn<TRouter extends AnyRouter> = (
  ctx: createSolidAPIHandlerContext
) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;

export type ICreateProps<TRouter extends AnyRouter> = {
  router: TRouter;
  createContext: CreateContextFn<TRouter>;
};

export type IFixedRequest = Request & {
  headers: Dict<string | string[]>;
};
