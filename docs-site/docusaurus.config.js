const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'andrewfranklinleo.com Docs',
  tagline: 'AI Governance Authority Platform Documentation',
  url: 'https://docs.andrewfranklinleo.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'andrewfranklinleo',
  projectName: 'andrewfranklinleo.com',

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
