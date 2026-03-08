module.exports = {
  docs: [
    'intro',
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
