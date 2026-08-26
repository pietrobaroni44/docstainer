// @ts-check
// Configurazione di Docstainer.
// Questo file gira in Node.js: niente codice lato browser o JSX qui dentro.
// Riferimento completo: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// ---------------------------------------------------------------------------
// 1. DA PERSONALIZZARE quando riusi questo template
//    Nella maggior parte dei casi basta cambiare i valori qui sotto.
// ---------------------------------------------------------------------------
const progetto = {
  titolo: 'Docstainer',
  slogan: 'Template di documentazione: Markdown semplice, Docusaurus, Docker.',
  descrizione:
    'Punto di partenza riutilizzabile per scrivere documentazione in Markdown ' +
    'portabile, con ricerca offline, diagrammi e formule.',

  // URL pubblico del sito (senza slash finale) e sottocartella di pubblicazione.
  // Esempio GitHub Pages di progetto: url 'https://utente.github.io', baseUrl '/nome-repo/'
  url: 'https://esempio.invalid',
  baseUrl: '/',

  // Usati dal deploy su GitHub Pages e dai link "Modifica questa pagina".
  // Cambiali con il tuo account e il tuo repository, altrimenti i link
  // della barra in alto e i "Modifica questa pagina" puntano nel vuoto.
  organizzazione: 'tuo-utente-github',
  repository: 'nome-del-repository',
  // Metti `null` per togliere i link "Modifica questa pagina".
  ramo: 'main',

  copyright: 'Il tuo nome / la tua organizzazione',
};

const editUrl = progetto.ramo
  ? `https://github.com/${progetto.organizzazione}/${progetto.repository}/tree/${progetto.ramo}/`
  : undefined;

// ---------------------------------------------------------------------------
// 2. Configurazione vera e propria (di solito non serve toccarla)
// ---------------------------------------------------------------------------

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: progetto.titolo,
  tagline: progetto.slogan,
  favicon: 'img/favicon.ico',

  url: progetto.url,
  baseUrl: progetto.baseUrl,
  organizationName: progetto.organizzazione,
  projectName: progetto.repository,
  trailingSlash: false,

  // Segnala i link interni rotti in fase di build: meglio accorgersene qui
  // che in produzione. Metti 'warn' se ti blocca durante la scrittura.
  onBrokenLinks: 'throw',

  future: {
    v4: true, // compatibilità con la futura Docusaurus v4
  },

  i18n: {
    defaultLocale: 'it',
    locales: ['it'],
  },

  markdown: {
    // 'detect': i file .md sono Markdown standard (CommonMark), i .mdx sono MDX.
    // È la scelta che rende i contenuti portabili: un .md di questo progetto
    // si apre e si legge ovunque (GitHub, Obsidian, VS Code, pandoc...).
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          editUrl,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // --- Versionamento ---------------------------------------------
          // La cartella docs/ è la versione corrente ed è quella pubblicata.
          // Per congelare una release:
          //   docker compose run --rm dev npm run docusaurus docs:version 1.0
          // Vedi docs/guida-rapida/versioni.md per la procedura completa.
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: '1.0',
              path: '',
            },
          },
        },
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          blogTitle: 'Novità',
          blogDescription: 'Aggiornamenti e note di rilascio del progetto.',
          blogSidebarTitle: 'Ultimi articoli',
          showReadingTime: true,
          editUrl,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: `${progetto.titolo} - Novità`,
            copyright: `Copyright © ${new Date().getFullYear()} ${progetto.copyright}`,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          // Aggiungi `lastmod: 'date'` quando il progetto è un repository
          // git: la data di ultima modifica viene letta dai commit.
        },
      }),
    ],
  ],

  themes: [
    // Diagrammi Mermaid dentro i blocchi ```mermaid
    '@docusaurus/theme-mermaid',
    // Ricerca full-text 100% locale: nessun servizio esterno, funziona offline.
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        language: ['it', 'en'],
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 8,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.svg',
      metadata: [{name: 'description', content: progetto.descrizione}],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      navbar: {
        title: progetto.titolo,
        logo: {
          alt: `Logo ${progetto.titolo}`,
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'documentazione',
            position: 'left',
            label: 'Documentazione',
          },
          {to: '/blog', label: 'Novità', position: 'left'},
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            href: `https://github.com/${progetto.organizzazione}/${progetto.repository}`,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentazione',
            items: [
              {label: 'Introduzione', to: '/docs'},
              {label: 'Avvio', to: '/docs/guida-rapida/avvio'},
              {label: 'Sintassi Markdown', to: '/docs/guida-rapida/sintassi/base'},
            ],
          },
          {
            title: 'Operazioni',
            items: [
              {label: 'Docker', to: '/docs/guida-rapida/operazioni/docker'},
              {label: 'Pubblicazione', to: '/docs/guida-rapida/operazioni/pubblicazione'},
              {label: 'Novità', to: '/blog'},
            ],
          },
          {
            title: 'Risorse',
            items: [
              {label: 'Docusaurus', href: 'https://docusaurus.io'},
              {label: 'Sintassi Mermaid', href: 'https://mermaid.js.org'},
              {
                href: `https://github.com/${progetto.organizzazione}/${progetto.repository}`,
                label: 'Repository',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ${progetto.copyright}. Realizzato con Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'docker', 'ini', 'powershell'],
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
    }),
};

export default config;
