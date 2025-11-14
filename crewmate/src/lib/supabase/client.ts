import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";

let clientInstance: ReturnType<typeof createSupabaseBrowserClient> | null = null;

export function createBrowserClient() {
  if (!clientInstance) {
    clientInstance = createSupabaseBrowserClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!
    );
  }
  return clientInstance;
}
