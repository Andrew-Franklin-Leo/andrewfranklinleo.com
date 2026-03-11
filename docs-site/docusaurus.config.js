const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'andrewfranklinleo.com Docs',
  tagline: 'AI Governance Authority Platform Documentation',
  url: 'https://andrew-leo-2024.github.io',
  baseUrl: '/andrewfranklinleo-docs/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'andrew-leo-2024',
  projectName: 'andrewfranklinleo-docs',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'AFL Platform Docs',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'products/overview',
            position: 'left',
            label: 'Products',
          },
          {
            href: 'https://andrewfranklinleo.com',
            label: 'Live Site',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Architecture', to: '/architecture/overview' },
              { label: 'Monetization', to: '/monetization/revenue-streams' },
              { label: 'API Reference', to: '/api/endpoints' },
            ],
          },
          {
            title: 'Products',
            items: [
              { label: 'Product Catalog', to: '/products/overview' },
              { label: 'Aureya Code', to: '/products/aureya-code' },
              { label: 'Aureya Notebook', to: '/products/aureya-notebook' },
              { label: 'Maxwork', to: '/products/maxwork' },
            ],
          },
          {
            title: 'Platform',
            items: [
              { label: 'Skills & Tools', to: '/skills/master-plan' },
              { label: 'Agents', to: '/agents/team' },
              { label: 'Operations', to: '/operations/deployment' },
            ],
          },
        ],
        copyright: `Copyright ${new Date().getFullYear()} Andrew Franklin Leo. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'json', 'typescript'],
      },
    }),
});
