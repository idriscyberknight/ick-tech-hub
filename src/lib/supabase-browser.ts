import { createBrowserClient } from "@supabase/ssr";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error("This client must run in the browser.");
  }

  if (!browserClient) {
    const url = import.meta.env["VITE_SUPABASE_URL"];
    const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];

    if (!url || !key?.startsWith("sb_publishable_")) {
      throw new Error("Supabase configuration is missing or invalid.");
    }

    browserClient = createBrowserClient(url, key);
  }

  return browserClient;
}
