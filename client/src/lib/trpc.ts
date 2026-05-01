import { createTRPCReact } from "@trpc/react-query";

// Router type is intentionally `any` because suddeco-landing does not import
// the suddeco-review AppRouter type. Cast the helper to `any` as well so
// tRPC v11's built-in property-collision warnings (useUtils / Provider /
// auth / contact / etc.) don't surface as TS2339 errors at every call site.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc = createTRPCReact<any>() as any;
