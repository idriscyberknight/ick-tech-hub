import { createServerClient } from "@supabase/ssr";

import { getCookies, setCookie, setResponseHeader } from "@tanstack/react-start/server";

export function getSupabaseServerClient() {
  const url = import.meta.env["VITE_SUPABASE_URL"];
  const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

  if (!url || !key?.startsWith("sb_publishable_")) {
    throw new Error("Supabase server configuration is missing.");
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return Object.entries(getCookies()).map(([name, value]) => ({
          name,
          value,
        }));
      },

      setAll(cookies, headers) {
        cookies.forEach(({ name, value, options }) => {
          setCookie(name, value, options);
        });

        if (headers) {
          Object.entries(headers).forEach(([name, value]) => {
            setResponseHeader(name, value);
          });
        }
      },
    },
  });
}
