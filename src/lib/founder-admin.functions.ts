import { createServerFn } from "@tanstack/react-start";
import { checkFounderAuthorization } from "./founder-authorization.server";

export const checkFounderAdminAccess = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    const result = await checkFounderAuthorization();

    return {
      authorized: result.authorized === true,
    };
  } catch {
    return {
      authorized: false,
    };
  }
});
