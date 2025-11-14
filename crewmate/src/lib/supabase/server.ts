// Note: Server-side Supabase client is not available in Vite/SPA setup
// Use createBrowserClient from './client' instead for all operations
// This file is kept for compatibility but redirects to browser client

import { createBrowserClient } from './client'

export function createServerClient() {
  // In a Vite SPA, we use the browser client for all operations
  return createBrowserClient()
}

export const createClient = createServerClient
