/**
 * Topic taxonomy for the Price Transparency Project.
 *
 * Each topic owns ONE accent color, used consistently everywhere it appears
 * (feed-card tags, the "What we cover" cards, topic landing headers). The
 * palette stays within the page's blue→teal→green spectrum — subtle, not a
 * traffic light. `tagText` colors inline tag labels; `iconBg` tints the
 * icon chip (light fill + matching text). Keep these as full class strings
 * so Tailwind can statically detect them.
 */
export const topics = [
  {
    slug: 'analysis',
    label: 'Analysis',
    shortLabel: 'Analysis',
    href: '/pricetransparencyproject/analysis',
    color: 'brand-primary',
    tagText: 'text-brand-primary',
    iconBg: 'bg-brand-primary text-white',
    iconClass: 'analysis',
    description: 'Data-driven analysis of pricing patterns, market variation, and what the numbers reveal about payer-provider dynamics.',
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 14L6.5 9.5L10 12L16 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    slug: 'policy',
    label: 'Policy & Regulation',
    shortLabel: 'Policy',
    href: '/pricetransparencyproject/policy',
    color: 'brand-dark',
    tagText: 'text-brand-dark',
    iconBg: 'bg-brand-dark text-white',
    iconClass: 'policy',
    description: "CMS rulemaking, enforcement, No Surprises Act outcomes, and what's next for federal and state transparency mandates.",
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M6 6h6M6 9h6M6 12h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  },
  {
    slug: 'playbook',
    label: 'Field Guides',
    shortLabel: 'Guides',
    href: '/pricetransparencyproject/playbook',
    color: 'brand-accent',
    tagText: 'text-brand-accent',
    iconBg: 'bg-brand-accent text-white',
    iconClass: 'playbook',
    description: 'How to benchmark rates, read an MRF, prepare for negotiations, and use transparency data in daily operations.',
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.5"/></svg>',
  },
  {
    slug: 'equity',
    label: 'Patient Equity',
    shortLabel: 'Equity',
    href: '/pricetransparencyproject/equity',
    color: 'brand-secondary',
    tagText: 'text-brand-secondary',
    iconBg: 'bg-brand-secondary text-white',
    iconClass: 'equity',
    description: "Price variation's human impact. Surprise billing, access gaps, and tools that put pricing power back in patients' hands.",
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2C5.5 5 3 8.5 3 11a6 6 0 0012 0c0-2.5-2.5-6-6-9z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  },
  {
    slug: 'employer',
    label: 'Empowering Employers',
    shortLabel: 'Employer',
    href: '/pricetransparencyproject/employer',
    color: 'teal-600',
    tagText: 'text-teal-600',
    iconBg: 'bg-teal-600 text-white',
    iconClass: 'employer',
    description: 'Empowering employers with the data and tools to make smarter benefits decisions, negotiate better rates, and lower healthcare costs for their workforce.',
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 15v-1a4 4 0 014-4h4a4 4 0 014 4v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="3" stroke="currentColor" stroke-width="1.5"/></svg>',
  },
] as const;

export type TopicSlug = (typeof topics)[number]['slug'];
