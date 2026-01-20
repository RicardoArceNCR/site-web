### ESTRUCTURA
.
├── .env.local
├── .gitignore
├── app
│   ├── (site)
│   │   ├── [...slug]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components
│   └── home
│       ├── PostCard.tsx
│       └── sections
│           ├── CategorySplit.tsx
│           ├── Destacados.tsx
│           └── Principales.tsx
├── estructura_completa_proyecto.txt
├── estructura_proyecto.txt
├── lib
│   ├── sanitize.ts
│   └── wpgraphql.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── project_tree.txt
├── proyecto_estructura_detallada.txt
├── reporte_proyecto.md
├── tailwind.config.js
├── tsconfig.json
└── types
    └── next-fetch.d.ts

9 directories, 25 files

### package.json
{
  "name": "articulo66-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^16.1.1",
    "react": "^19.2.3",
    "react-dom": "^19.2.3"
  },
  "devDependencies": {
    "@types/node": "^25.0.6",
    "@types/react": "^19.2.8",
    "@types/react-dom": "^19.2.3",
    "autoprefixer": "^10.4.23",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.3"
  }
}

### next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'divergentes.local' },
      { protocol: 'https', hostname: 'divergentes.com' },
    ],
  },
};

export default nextConfig;

### tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Node",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "*"
      ]
    },
    "types": [
      "node",
      "react",
      "react-dom"
    ],
    "resolveJsonModule": true,
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "noEmit": true,
    "incremental": true,
    "isolatedModules": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "types/**/*.d.ts",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
