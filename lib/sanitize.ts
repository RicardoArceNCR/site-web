// lib/sanitize.ts
export function isAllowedEmbedSrc(src: string, allowlist: string[]): boolean {
  try {
    const u = new URL(src);
    return allowlist.some((host) => u.hostname === host || u.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

export function pickIframeAttrs(input: Record<string, any>) {
  const { src, title, width, height, allow, allowFullScreen, loading, referrerPolicy } = input || {};
  return {
    src,
    title: title || 'Embedded content',
    width: width || '100%',
    height: height || 360,
    allow: allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
    allowFullScreen: typeof allowFullScreen === 'boolean' ? allowFullScreen : true,
    loading: loading || 'lazy',
    referrerPolicy: referrerPolicy || 'no-referrer-when-downgrade',
  } as const;
}
