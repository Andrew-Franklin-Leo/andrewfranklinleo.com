import { SprintDefinition } from './types';

export const SPRINT_DEFINITIONS: SprintDefinition[] = [
  {
    type: 'production_stability',
    name: 'Production Stability Sprint',
    description: '90-day proof unit targeting OTIF, DIO, and expediting costs in manufacturing environments.',
    defaultBudget: 95000,
    durationDays: 90,
    kpiTargets: [
      { name: 'OTIF Rate', metric: 'otif_rate', baselineValue: 0, targetValue: 95, unit: '%', measurementFrequency: 'weekly' },
      { name: 'Days Inventory Outstanding', metric: 'dio', baselineValue: 0, targetValue: 0, unit: 'days', measurementFrequency: 'weekly' },
      { name: 'Expediting Cost Reduction', metric: 'expediting_cost_reduction', baselineValue: 0, targetValue: 30, unit: '%', measurementFrequency: 'monthly' },
    ],
    killConditions: [
      { metric: 'otif_rate', operator: 'lt', threshold: 70, checkAfterDays: 30, description: 'OTIF below 70% after 30 days' },
      { metric: 'client_satisfaction', operator: 'lt', threshold: 3, checkAfterDays: 14, description: 'Client satisfaction below 3/5 after 2 weeks' },
    ],
    requiredCapabilities: ['manufacturing', 'supply_chain', 'production_planning'],
  },
  {
    type: 'fleet_utilization',
    name: 'Fleet Utilization Recovery',
    description: '90-day proof unit targeting asset utilization, route optimization, and fuel efficiency in logistics.',
    defaultBudget: 110000,
    durationDays: 90,
    kpiTargets: [
      { name: 'Fleet Utilization', metric: 'fleet_utilization', baselineValue: 0, targetValue: 85, unit: '%', measurementFrequency: 'weekly' },
      { name: 'Empty Miles Reduction', metric: 'empty_miles_reduction', baselineValue: 0, targetValue: 25, unit: '%', measurementFrequency: 'weekly' },
      { name: 'Fuel Efficiency Gain', metric: 'fuel_efficiency_gain', baselineValue: 0, targetValue: 15, unit: '%', measurementFrequency: 'monthly' },
    ],
    killConditions: [
      { metric: 'fleet_utilization', operator: 'lt', threshold: 60, checkAfterDays: 30, description: 'Fleet utilization below 60% after 30 days' },
    ],
    requiredCapabilities: ['logistics', 'fleet_management', 'route_optimization'],
  },
  {
    type: 'margin_recovery',
    name: 'Margin Recovery Sprint',
    description: '90-day proof unit targeting gross margin improvement through pricing, procurement, and waste reduction.',
    defaultBudget: 85000,
    durationDays: 90,
    kpiTargets: [
      { name: 'Gross Margin Improvement', metric: 'gross_margin_improvement', baselineValue: 0, targetValue: 5, unit: 'pp', measurementFrequency: 'monthly' },
      { name: 'Procurement Savings', metric: 'procurement_savings', baselineValue: 0, targetValue: 10, unit: '%', measurementFrequency: 'monthly' },
      { name: 'Waste Reduction', metric: 'waste_reduction', baselineValue: 0, targetValue: 20, unit: '%', measurementFrequency: 'weekly' },
    ],
    killConditions: [
      { metric: 'gross_margin_improvement', operator: 'lt', threshold: 1, checkAfterDays: 45, description: 'Less than 1pp margin gain after 45 days' },
    ],
    requiredCapabilities: ['financial_analysis', 'procurement', 'pricing'],
  },
  {
    type: 'working_capital',
    name: 'Working Capital Sprint',
    description: '90-day proof unit targeting cash conversion cycle, payables optimization, and capital efficiency.',
    defaultBudget: 100000,
    durationDays: 90,
    kpiTargets: [
      { name: 'Cash Conversion Cycle', metric: 'cash_conversion_days', baselineValue: 0, targetValue: 0, unit: 'days', measurementFrequency: 'weekly' },
      { name: 'Working Capital Freed', metric: 'working_capital_freed', baselineValue: 0, targetValue: 0, unit: '$', measurementFrequency: 'monthly' },
      { name: 'DPO Improvement', metric: 'dpo_improvement', baselineValue: 0, targetValue: 10, unit: 'days', measurementFrequency: 'monthly' },
    ],
    killConditions: [
      { metric: 'cash_conversion_days', operator: 'gt', threshold: 0, checkAfterDays: 60, description: 'No CCC improvement after 60 days' },
    ],
    requiredCapabilities: ['treasury', 'financial_analysis', 'payables'],
  },
  {
    type: 'receivables',
    name: 'Receivables Acceleration Sprint',
    description: '90-day proof unit targeting DSO reduction, collection rates, and aging bucket optimization.',
    defaultBudget: 80000,
    durationDays: 90,
    kpiTargets: [
      { name: 'DSO Reduction', metric: 'dso_reduction', baselineValue: 0, targetValue: 15, unit: 'days', measurementFrequency: 'weekly' },
      { name: 'Collection Rate', metric: 'collection_rate', baselineValue: 0, targetValue: 95, unit: '%', measurementFrequency: 'weekly' },
      { name: '90+ Day Aging Reduction', metric: 'aging_90_reduction', baselineValue: 0, targetValue: 50, unit: '%', measurementFrequency: 'monthly' },
    ],
    killConditions: [
      { metric: 'dso_reduction', operator: 'lt', threshold: 5, checkAfterDays: 45, description: 'Less than 5-day DSO improvement after 45 days' },
    ],
    requiredCapabilities: ['collections', 'credit_management', 'financial_analysis'],
  },
  {
    type: 'decision_latency',
    name: 'Decision Latency Sprint',
    description: '90-day proof unit targeting decision cycle time, approval bottlenecks, and governance velocity.',
    defaultBudget: 90000,
    durationDays: 90,
    kpiTargets: [
      { name: 'Decision Cycle Time', metric: 'decision_cycle_hours', baselineValue: 0, targetValue: 0, unit: 'hours', measurementFrequency: 'weekly' },
      { name: 'Approval Bottleneck Reduction', metric: 'bottleneck_reduction', baselineValue: 0, targetValue: 60, unit: '%', measurementFrequency: 'weekly' },
      { name: 'Governance Velocity', metric: 'governance_velocity', baselineValue: 0, targetValue: 0, unit: 'decisions/day', measurementFrequency: 'daily' },
    ],
    killConditions: [
      { metric: 'decision_cycle_hours', operator: 'gt', threshold: 0, checkAfterDays: 30, description: 'No improvement in decision cycle time after 30 days' },
    ],
    requiredCapabilities: ['process_optimization', 'governance', 'change_management'],
  },
];
