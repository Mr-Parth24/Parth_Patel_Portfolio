import { useEffect, useState } from 'react';

export interface DailyQuote {
  text: string;
  author: string;
}

const STORAGE_PREFIX = 'portfolio-footer-quote';

const FALLBACKS: DailyQuote[] = [
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
  { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { text: 'Technology is best when it brings people together.', author: 'Matt Mullenweg' },
];

function dayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function pickFallback(): DailyQuote {
  const i = Math.floor(Math.random() * FALLBACKS.length);
  return FALLBACKS[i] ?? FALLBACKS[0]!;
}

function normalizePayload(data: unknown): DailyQuote | null {
  if (!data || typeof data !== 'object') return null;

  if (Array.isArray(data) && data.length > 0) {
    const row = data[0] as Record<string, unknown>;
    if (typeof row.q === 'string' && typeof row.a === 'string') {
      return { text: row.q.trim(), author: row.a.trim() };
    }
    const first = data[0] as Record<string, unknown>;
    return normalizePayload(first);
  }

  const o = data as Record<string, unknown>;
  const text =
    (typeof o.quote === 'string' && o.quote) ||
    (typeof o.content === 'string' && o.content) ||
    (typeof o.text === 'string' && o.text) ||
    (typeof o.message === 'string' && o.message);
  const author =
    (typeof o.author === 'string' && o.author) ||
    (typeof o.a === 'string' && o.a) ||
    (typeof o.by === 'string' && o.by) ||
    'Unknown';

  if (text && typeof text === 'string') {
    const t = text.trim();
    const au = String(author).trim() || 'Unknown';
    if (t.length > 0) return { text: t, author: au };
  }
  return null;
}

async function fetchCustom(url: string, apiKey?: string): Promise<DailyQuote | null> {
  try {
    const u = url.startsWith('http://') || url.startsWith('https://')
      ? new URL(url)
      : new URL(url, window.location.origin);
    u.searchParams.set('day', dayKey());
    const headers: HeadersInit = { Accept: 'application/json' };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
    const res = await fetch(u.toString(), { headers, credentials: 'omit' });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return normalizePayload(data);
  } catch {
    return null;
  }
}

/** ZenQuotes “today” — same quote for everyone, rotates daily. */
async function fetchZenToday(): Promise<DailyQuote | null> {
  try {
    const res = await fetch('https://zenquotes.io/api/today', { credentials: 'omit' });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return normalizePayload(data);
  } catch {
    return null;
  }
}

async function fetchQuotable(): Promise<DailyQuote | null> {
  try {
    const tags = 'technology|science|wisdom';
    let res = await fetch(`https://api.quotable.io/random?tags=${encodeURIComponent(tags)}`, {
      credentials: 'omit',
    });
    if (!res.ok) {
      res = await fetch('https://api.quotable.io/random', { credentials: 'omit' });
    }
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return normalizePayload(data);
  } catch {
    return null;
  }
}

export function useDailyQuote() {
  const [quote, setQuote] = useState<DailyQuote | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    const customUrl = (import.meta.env.VITE_DAILY_QUOTE_URL as string | undefined)?.trim();
    const apiKey = (import.meta.env.VITE_DAILY_QUOTE_API_KEY as string | undefined)?.trim();

    const cacheKey = `${STORAGE_PREFIX}:${dayKey()}:${customUrl || 'builtin'}`;

    const run = async () => {
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          try {
            const parsed = JSON.parse(cached) as DailyQuote;
            if (parsed?.text?.trim() && parsed?.author?.trim() && !cancelled) {
              setQuote({ text: parsed.text.trim(), author: parsed.author.trim() });
              setStatus('ready');
              return;
            }
          } catch {
            /* invalid cache */
          }
        }

        let next: DailyQuote | null = null;

        if (customUrl) {
          next = await fetchCustom(customUrl, apiKey);
        }
        if (!next) next = await fetchZenToday();
        if (!next) next = await fetchQuotable();
        if (!next) next = pickFallback();

        try {
          localStorage.setItem(cacheKey, JSON.stringify(next));
        } catch {
          /* quota / private mode */
        }

        if (!cancelled) {
          setQuote(next);
          setStatus('ready');
        }
      } catch {
        if (!cancelled) {
          setQuote(pickFallback());
          setStatus('error');
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { quote, status };
}
