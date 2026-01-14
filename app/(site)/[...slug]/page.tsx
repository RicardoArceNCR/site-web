import { notFound } from 'next/navigation';
import { fetchGraphQL } from '@/lib/wpgraphql';

type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  } | null;
};

type PostQuery = {
  post: Post | null;
};

type Params = { slug?: string[] };

export default async function PostPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const parts = Array.isArray(resolvedParams.slug) ? resolvedParams.slug : [];

  if (parts.length === 0) notFound();

  // trailing slash para WPGraphQL
  const uri = `/${parts.join('/')}/`;

  const { post: postBy } = await fetchGraphQL<PostQuery>(
    `query GetPost($id: ID!) {
      post(id: $id, idType: URI) {
        id
        title
        date
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }`,
    { id: uri }
  );

  if (!postBy) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{postBy.title}</h1>
        <time dateTime={postBy.date} className="text-gray-500">
          {new Date(postBy.date).toLocaleDateString('es-NI', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>

      {postBy.featuredImage?.node?.sourceUrl && (
        <div className="mb-8">
          <img
            src={postBy.featuredImage.node.sourceUrl}
            alt={postBy.featuredImage.node.altText || postBy.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: postBy.content }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  return [];
}

export const dynamicParams = true;
export const revalidate = 60;
