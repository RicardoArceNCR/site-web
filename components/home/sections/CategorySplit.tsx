// components/home/sections/CategorySplit.tsx
import PostCard from '../PostCard';
import { PostCore } from '../../../lib/wpgraphql';

export default function CategorySplit({ title, posts }: { title: string; posts: PostCore[] }) {
  if (!posts || posts.length === 0) return null;
  const [a, b, ...rest] = posts;
  const thumbs = rest.slice(0, 4);
  return (
    <section className="my-10">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
          {a && <PostCard post={a} variant="large" />}
          {b && <PostCard post={b} variant="large" />}
        </div>
        <div className="flex flex-col gap-6">
          {thumbs.map((p) => (
            <PostCard key={p.id} post={p} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
