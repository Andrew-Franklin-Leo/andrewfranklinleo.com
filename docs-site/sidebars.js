module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Ecosystem',
      items: [
        'ecosystem/overview',
        'ecosystem/aureya-os',
        'ecosystem/aine',
        'ecosystem/tower-control',
        'ecosystem/wge',
        'ecosystem/agent-patterns',
        'ecosystem/self-healing',
        'ecosystem/monetization',
        'ecosystem/marketplaces',
      ],
    },
    {
      type: 'category',
      label: 'Products',
      items: [
        'products/overview',
        {
          type: 'category',
          label: 'Development & Engineering',
          items: [
            'products/aureya-code',
            'products/aureya-builder',
            'products/codebot',
          ],
        },
        {
          type: 'category',
          label: 'Productivity & Operations',
          items: [
            'products/maxwork',
            'products/aureya-pm',
            'products/aureya-collab',
            'products/aureya-drive',
          ],
        },
        {
          type: 'category',
          label: 'Research & Knowledge',
          items: [
            'products/aureya-notebook',
            'products/aureya-scholar',
            'products/aureya-search',
          ],
        },
        {
          type: 'category',
          label: 'Creative & Design',
          items: [
            'products/aureya-design',
            'products/aureya-studio',
            'products/aureya-marketing',
          ],
        },
        {
          type: 'category',
          label: 'Infrastructure & Platform',
          items: [
            'products/aureya-local',
            'products/aureya-hub',
            'products/frankmax-plugins',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/design-system',
      ],
    },
    {
      type: 'category',
      label: 'Monetization',
      items: [
        'monetization/revenue-streams',
        'monetization/stripe-setup',
        'monetization/checkout-flows',
      ],
    },
    {
      type: 'category',
      label: 'Infrastructure',
      items: [
        'infrastructure/firebase',
        'infrastructure/stripe',
        'infrastructure/email',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/endpoints',
      ],
    },
    {
      type: 'category',
      label: 'Agents',
      items: [
        'agents/team',
      ],
    },
    {
      type: 'category',
      label: 'Skills & Tools',
      items: [
        'skills/master-plan',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        'operations/deployment',
      ],
    },
  ],
};
