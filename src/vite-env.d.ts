/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GET JSON: { quote, author } | { content, author } | ZenQuotes [{ q, a }] — optional ?day=YYYY-MM-DD appended */
  readonly VITE_DAILY_QUOTE_URL?: string;
  /** Optional Bearer token for VITE_DAILY_QUOTE_URL */
  readonly VITE_DAILY_QUOTE_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
