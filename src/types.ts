import { AnyRouter, inferRouterContext, Dict } from "@trpc/server";
import { APIEvent } from "solid-start/api/types";

export type CreateContextFn<TRouter extends AnyRouter> = (
  APIArgs: APIEvent
) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;

export type ICreateProps<TRouter extends AnyRouter> = {
  router: TRouter;
  createContext: CreateContextFn<TRouter>;
};

export type IFixedRequest = Request & {
  headers: Dict<string | string[]>;
};
