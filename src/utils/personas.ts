/**
 * personas.ts
 *
 * Single source of truth for the Solutions persona list. Used by the homepage
 * on-ramp strip and the cross-link strip on each SolutionLayout page (which
 * filters out the current persona). `name` matches the `persona` prop passed
 * to SolutionLayout so filtering is an exact string match.
 */
export interface Persona {
  name: string;
  href: string;
  desc: string;
  /** Inline SVG markup (rendered via set:html). */
  icon: string;
}

export const personas: Persona[] = [
  {
    name: 'Providers',
    href: '/solutions/providers',
    desc: 'Benchmark your rates and negotiate with the whole market.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.25 21h19.5M4.5 21V6.75A2.25 2.25 0 0 1 6.75 4.5h6a2.25 2.25 0 0 1 2.25 2.25V21M15.75 21V11.25a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5V21M8.25 9h.75M8.25 12h.75M8.25 15h.75M11.25 9h.75M11.25 12h.75" /></svg>',
  },
  {
    name: 'Consultants',
    href: '/solutions/consultants',
    desc: 'Benchmark clients across markets without the data lift.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" /></svg>',
  },
  {
    name: 'Med Device',
    href: '/solutions/medical-device',
    desc: 'Track reimbursement by procedure and site of care.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6.75 6.75h10.5v10.5H6.75zM9 3v1.5m3-1.5v1.5m3-1.5v1.5M9 19.5V21m3-1.5V21m3-1.5V21M4.5 9H3m1.5 3H3m1.5 3H3M21 9h-1.5M21 12h-1.5M21 15h-1.5" /></svg>',
  },
  {
    name: 'Employers',
    href: '/solutions/employers',
    desc: 'Independent rate data for the plans you pay for.',
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6.75 7.5V6A2.25 2.25 0 0 1 9 3.75h6A2.25 2.25 0 0 1 17.25 6v1.5M3.75 7.5h16.5A1.5 1.5 0 0 1 21.75 9v9a1.5 1.5 0 0 1-1.5 1.5H3.75A1.5 1.5 0 0 1 2.25 18V9a1.5 1.5 0 0 1 1.5-1.5ZM3 12h18" /></svg>',
  },
];
