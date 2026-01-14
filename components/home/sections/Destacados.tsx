// components/home/sections/Destacados.tsx
import PostCard from '../PostCard';
import { PostCore } from '@/lib/wpgraphql';

export default function Destacados({
  principal,
  secundarios,
}: {
  principal?: PostCore | null;
  secundarios?: PostCore[];
}) {
  if (!principal && (!secundarios || secundarios.length === 0)) return null;
  const sec = (secundarios || []).slice(0, 2);
  return (
    <section className="my-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          {principal && <PostCard post={principal} variant="large" showExcerpt />}
        </div>
        <div className="flex flex-col gap-6">
          {sec.map((p) => (
            <PostCard key={p.id} post={p} variant="medium" />
          ))}
        </div>
      </div>
    </section>
  );
}
