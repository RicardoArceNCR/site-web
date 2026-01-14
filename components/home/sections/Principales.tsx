// components/home/sections/Principales.tsx
import PostCard from '../PostCard';
import { PostCore } from '@/lib/wpgraphql';

export default function Principales({ posts }: { posts: PostCore[] }) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="my-10">
      <div className="grid gap-6 md:grid-cols-4">
        {posts.slice(0, 4).map((p) => (
          <PostCard key={p.id} post={p} variant="medium" />
        ))}
      </div>
    </section>
  );
}
