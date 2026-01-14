// lib/wpgraphql.ts
import 'server-only';

export type FetchOpts = {
  revalidate?: number | false;
  tags?: string[];
};

function normalizeGraphqlUrl(raw?: string) {
  if (!raw) return raw;
  // Do NOT force trailing slash; some WP setups only serve /graphql without slash
  return raw.trim();
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  opts: FetchOpts = {}
): Promise<T> {
  const urlEnv = (globalThis as any)?.process?.env?.WPGRAPHQL_URL || (globalThis as any)?.process?.env?.NEXT_PUBLIC_WPGRAPHQL_URL;
  const url = normalizeGraphqlUrl(urlEnv);
  if (!url) throw new Error('WPGRAPHQL_URL is not set');
  console.log('[wpgraphql] URL =', url);
  const res = await  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // Next.js extended options for ISR/tagged caching
    next: {
      revalidate: opts.revalidate ?? 120,
      tags: opts.tags,
    },
  } as any);
  if (!res.ok) throw new Error(`GraphQL error: ${res.status} (url: ${url})`);
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data as T;
}

// Tipos base
export type MediaNode = {
  sourceUrl: string;
  altText?: string;
  mediaDetails?: { width?: number; height?: number };
};

export type PostCore = {
  id: string;
  uri: string;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  featuredImage?: { node: MediaNode } | null;
  categories?: { nodes: { slug: string; name: string }[] } | null;
};

export type EditorBlock = {
  name: string;
  attributesJSON?: string;
  innerBlocks?: EditorBlock[];
  renderedHtml?: string | null;
};
