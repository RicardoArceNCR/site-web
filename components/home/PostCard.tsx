// components/home/PostCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { PostCore } from '@/lib/wpgraphql';

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')  // Remove HTML tags
    .replace(/\s+/g, ' ')      // Collapse multiple spaces
    .replace(/&[^;]+;/g, ' ')  // Remove HTML entities
    .trim();
}

export type PostCardProps = {
  post: PostCore;
  variant?: 'large' | 'medium' | 'compact';
  showExcerpt?: boolean;
};

export default function PostCard({ post, variant = 'medium', showExcerpt = false }: PostCardProps) {
  // Use post.uri if available, otherwise fall back to /post-slug
  const href = post.uri ?? `/${post.slug}`;
  const media = post.featuredImage?.node;
  const date = new Date(post.date).toLocaleDateString('es-NI', { year: 'numeric', month: 'short', day: 'numeric' });

  const titleCls = {
    large: 'text-2xl md:text-3xl font-bold',
    medium: 'text-xl font-semibold',
    compact: 'text-base font-semibold',
  }[variant];

  return (
    <article className="group">
      <Link href={href} className="block">
        {media?.sourceUrl && (
          <div className="relative w-full overflow-hidden rounded-md bg-neutral-200" style={{ aspectRatio: '16/9' }}>
            <Image
              src={media.sourceUrl}
              alt={media.altText || ''}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <h3 className={`${titleCls} mt-3 leading-tight`}>{post.title}</h3>
      </Link>
      <div className="mt-2 text-xs text-neutral-500 flex items-center gap-2">
        {post.categories?.nodes?.[0] && (
          <span className="uppercase tracking-wide">{post.categories.nodes[0].name}</span>
        )}
        <span>•</span>
        <time dateTime={post.date}>{date}</time>
      </div>
      {showExcerpt && post.excerpt && (
        <div 
          className="text-neutral-700 mt-2 line-clamp-3 [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      )}
    </article>
  );
}
