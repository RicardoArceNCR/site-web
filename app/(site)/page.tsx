// app/(site)/page.tsx
import Destacados from '@/components/home/sections/Destacados';
import Principales from '@/components/home/sections/Principales';
import CategorySplit from '@/components/home/sections/CategorySplit';
import { fetchGraphQL, PostCore } from '@/lib/wpgraphql';

// GraphQL: ACF Options Portada + fallbacks por categoría
const HOME_QUERY = /* GraphQL */ `
fragment PostCoreFields on Post {
  id
  uri
  slug
  title
  date
  excerpt
}

query HomePage {
  portadaA66 {
    portadaA66Fields {
      articuloprincipal {
        node { __typename ... on Post { ...PostCoreFields } }
      }
      articulosecundario1 {
        node { __typename ... on Post { ...PostCoreFields } }
      }
      articulosecundario2 {
        node { __typename ... on Post { ...PostCoreFields } }
      }
    }
  }

  fallback_principales: posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
    nodes { ...PostCoreFields }
  }

  fallback_nacionales: posts(first: 10, where: { orderby: { field: DATE, order: DESC }, categoryName: "nacionales" }) {
    nodes { ...PostCoreFields }
  }
  fallback_politica: posts(first: 10, where: { orderby: { field: DATE, order: DESC }, categoryName: "politica" }) {
    nodes { ...PostCoreFields }
  }
  fallback_internacionales: posts(first: 10, where: { orderby: { field: DATE, order: DESC }, categoryName: "internacionales" }) {
    nodes { ...PostCoreFields }
  }
  fallback_show: posts(first: 10, where: { orderby: { field: DATE, order: DESC }, categoryName: "show" }) {
    nodes { ...PostCoreFields }
  }
}
`;
// Mini query de prueba para GraphiQL (copiar/pegar):
// query HomePortadaA66 {
//   portadaA66 {
//     portadaA66Fields {
//       articuloprincipal { node { __typename ... on Post { uri title excerpt featuredImage { node { sourceUrl altText } } } } }
//       articulosecundario1 { node { __typename ... on Post { uri title excerpt featuredImage { node { sourceUrl altText } } } } }
//       articulosecundario2 { node { __typename ... on Post { uri title excerpt featuredImage { node { sourceUrl altText } } } } }
//     }
//   }
// }

type HomeQuery = {
  portadaA66: {
    portadaA66Fields?: {
      articuloprincipal?: { node: PostCore } | null;
      articulosecundario1?: { node: PostCore } | null;
      articulosecundario2?: { node: PostCore } | null;
    } | null;
  } | null;
  fallback_principales: { nodes: PostCore[] };
  fallback_nacionales: { nodes: PostCore[] };
  fallback_politica: { nodes: PostCore[] };
  fallback_internacionales: { nodes: PostCore[] };
  fallback_show: { nodes: PostCore[] };
  fallback_multimedia: { nodes: PostCore[] };
  fallback_podcasts: { nodes: PostCore[] };
  fallback_especiales: { nodes: PostCore[] };
};

function dedupe(slugs: string[], list: PostCore[]) {
  const set = new Set(slugs);
  return list.filter((p) => !set.has(p.slug));
}

export default async function HomePage() {
  const data = await fetchGraphQL<HomeQuery>(HOME_QUERY, undefined, { revalidate: 120, tags: ['home'] });
  // Destacado principal (curado desde ACF o fallback)
  const curado = data.portadaA66?.portadaA66Fields?.articuloprincipal?.node ?? null;
  const principalesFallback = data.fallback_principales?.nodes ?? [];
  const destacadoPrincipal = curado || principalesFallback[0] || null;
  const destacadosSec = [] as PostCore[];
  const used = [destacadoPrincipal?.slug, ...destacadosSec.map((p) => p.slug)].filter(Boolean) as string[];
  const fillDestacados = dedupe(used, principalesFallback).slice(1, 3);
  const destacadosSecFinal = destacadosSec.length ? destacadosSec : fillDestacados;

  // Principales curados o fallback
  const principalesCurados = [] as PostCore[];
  const principales = (principalesCurados.length ? principalesCurados : dedupe(used, principalesFallback)).slice(0, 4);

  // Secciones por categoría (ejemplos con CategorySplit)
  const fallbackNacionales = data.fallback_nacionales?.nodes ?? [];
  const fallbackPolitica = data.fallback_politica?.nodes ?? [];
  const fallbackInternacionales = data.fallback_internacionales?.nodes ?? [];
  const fallbackShow = data.fallback_show?.nodes ?? [];
  const nacionales = dedupe([...used, ...principales.map((p) => p.slug)], fallbackNacionales).slice(0, 6);
  const politica = dedupe([...used, ...principales.map((p) => p.slug)], fallbackPolitica).slice(0, 8);
  const internacionales = dedupe([...used, ...principales.map((p) => p.slug)], fallbackInternacionales).slice(0, 8);
  const show = dedupe([...used, ...principales.map((p) => p.slug)], fallbackShow).slice(0, 6);

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Destacados */}
      <Destacados principal={destacadoPrincipal} secundarios={destacadosSecFinal} />

      {/* Principales */}
      <Principales posts={principales} />

      {/* Publicidad slot 1 */}
      <div className="my-8">
        <div className="w-full h-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-600">Publicidad</div>
      </div>

      {/* Nacionales */}
      <CategorySplit title="Nacionales" posts={nacionales} />

      {/* Política */}
      <CategorySplit title="Política" posts={politica} />

      {/* Publicidad slot 2 */}
      <div className="my-8">
        <div className="w-full h-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-600">Publicidad</div>
      </div>

      {/* Internacionales */}
      <CategorySplit title="Internacionales" posts={internacionales} />

      {/* Show */}
      <CategorySplit title="Show" posts={show} />

      {/* TODO: Multimedia, Podcasts, Especiales (otros componentes) */}
    </main>
  );
}
