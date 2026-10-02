// Everything on the homepage that isn't a case study lives here.
// Keep claims factual: no invented metrics, titles or certifications.

import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const site = {
  name: 'João Cunha Pereira',
  url: 'https://joao247.github.io',
  title: 'João Cunha Pereira · Enterprise software engineer, SAP BTP',
  description:
    'Enterprise software engineer in Vienna. Primary technical contact for about 25 SAP BTP applications at Wienerberger, and builder of AI-enabled products like SayMacros.',
  role: 'SAP BTP Full Stack Developer',
  employer: 'Wienerberger',
  locality: 'Vienna',
  country: 'Austria',
  email: 'joaomcunhapereira@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/joao-pereira2407/',
    github: 'https://github.com/Joao247',
  },
  /** Drop a PDF at this path in /public and the CV buttons appear. */
  cvPath: '/cv/Joao-Cunha-Pereira-CV.pdf',
  updated: 'October 2026',
};

// Resolved from the project root: this module is bundled before it runs.
export const hasCv = existsSync(join(process.cwd(), 'public', site.cvPath));

export const attributes = [
  { label: 'Role', value: 'SAP BTP Full Stack Developer, Wienerberger' },
  { label: 'SAP BTP', value: '4 years, since 2022' },
  { label: 'Based', value: 'Vienna, Austria · Portuguese' },
  { label: 'Languages', value: 'PT, EN, ES, DE (B2)' },
];

export const evidence = [
  {
    label: 'Ownership',
    title: 'Technical owner for a portfolio of production SAP BTP applications.',
    body: 'New requirements, incidents and technical decisions across about 25 CAP and SAPUI5 applications come to me to investigate, design, build or guide.',
  },
  {
    label: 'Business to technical',
    title: 'Led two solutions from business requirement to production.',
    body: 'A company-register onboarding for the Czech SAP Sales Cloud rollout, and a self-service explanation of territory assignments that key users called intuitive.',
  },
  {
    label: 'Builder',
    title: 'Building an AI product end to end, on my own.',
    body: 'SayMacros turns a spoken meal into checked, structured nutrition data. Next.js, OpenAI and Supabase, tested in CI.',
  },
];

export const principles = [
  {
    title: 'Start from the question the business is asking.',
    body: 'The territory explanation started as one recurring question from key users: why was this customer assigned here? The design followed from making that answerable without a developer.',
  },
  {
    title: 'Put the seams where change is expected.',
    body: 'Other countries were likely to need other company registers, so the onboarding service exposes one stable contract and keeps each register behind its own adapter.',
  },
  {
    title: 'Own it after go-live.',
    body: 'I investigate production incidents, helped set up alerting for application failures, right-size Cloud Foundry memory, and open and follow SAP support cases when the platform is at fault.',
  },
  {
    title: 'Use AI where it helps, then verify.',
    body: 'In SayMacros the model extracts and deterministic code checks. In my own engineering, Claude and Codex speed up analysis and implementation, and tests, CI and review decide what ships.',
  },
];

export type Job = {
  org: string;
  role: string;
  when: string;
  where?: string;
  bullets?: string[];
  groups?: { label: string; bullets: string[] }[];
  minor?: boolean;
};

export const experience: Job[] = [
  {
    org: 'Wienerberger',
    role: 'SAP BTP Full Stack Developer · CRM and SAP Sales Cloud processes',
    when: 'Oct 2025 – now',
    where: 'Vienna',
    bullets: [
      'Primary technical contact for <strong>about 25 SAP BTP applications and repositories</strong>, covering new requirements, incidents, bugs and technical decisions. Many predate me; I own their ongoing evolution.',
      '<strong>Led the BTP design and implementation</strong> of <a href="/work/company-register-onboarding/">company-register onboarding for SAP Sales Cloud</a>, live since March 2026, and of territory and responsible-employee determination, including a <a href="/work/territory-explanation/">self-service assignment explanation</a>.',
      'Redesigned and fixed parts of existing systems: attachment consistency and repair, background event claiming and recovery, external project search, and retry, timeout and circuit-breaker handling for integrations.',
      '<strong>Production operations</strong>: incident investigation, alerting for application failures and crashes, and SAP support cases. Right-sized memory for Cloud Foundry application components to reduce BTP resource use.',
      'Weekly technical refinements with estimates, requirements discussions and demos with key users, and BTP knowledge transfer to colleagues.',
    ],
  },
  {
    org: 'STRATESYS',
    role: 'SAP BTP Full Stack Developer · first role after university',
    when: 'Sep 2022 – Sep 2025',
    groups: [
      {
        label: 'Cellnex · telecommunications',
        bullets: [
          'Extended CAP services and SAPUI5 functionality on an SAP BTP platform supporting telecommunications provisioning workflows.',
          'Worked directly with client users and project stakeholders on requirements and support requests, following issues through to resolution. Built automation and data-processing tooling in Python, SQL and Postman.',
        ],
      },
      {
        label: 'Pyxis · treasury and cash management',
        bullets: [
          'Contributed to the Stratesys SAP cash-management product: CAP Node.js OData v4 services, SAPUI5 and Fiori Elements, XSUAA and destinations, and integration with existing SAP systems.',
        ],
      },
    ],
    bullets: ['Delivered within Jenkins and SonarQube CI/CD pipelines.'],
  },
  {
    org: 'Cisco Engineer Incubator Program',
    role: 'Networking, cloud, security and customer-facing skills, alongside my STRATESYS role.',
    when: 'Sep 2024 – Mar 2025',
    minor: true,
  },
];

export const capabilities = [
  {
    title: 'Production, daily',
    hint: "Used in production systems I'm responsible for.",
    items: [
      'SAP BTP · Cloud Foundry',
      'CAP (Node.js)',
      'SAPUI5 · OData',
      'SAP Sales Cloud / C4C integration',
      'BTP destinations',
      'JavaScript · TypeScript · Node.js',
      'REST API and service design',
      'SQL · PostgreSQL',
    ],
  },
  {
    title: 'Working, shipped',
    hint: 'Used in shipped work or my own products.',
    items: [
      'Fiori Elements · XSUAA roles',
      'Background and event processing',
      'Next.js · React',
      'Supabase · Vercel',
      'OAuth / OIDC',
      'OpenAI APIs · speech, structured extraction',
      'Playwright · GitHub Actions',
      'Docker · Python · Jenkins · SonarQube',
    ],
  },
  {
    title: 'Exposure',
    hint: 'Familiar, not a specialist.',
    muted: true,
    items: [
      'S/4HANA integration',
      'Integration Suite / CPI',
      'SAP Build',
      'Angular · NestJS · TypeORM',
      'MCP servers',
    ],
  },
];

export type Cert = { name: string; level: string; from: string; to: string; active: boolean; url?: string };

// Update `active` (and `to`) if the 2025 certifications are renewed.
export const certifications: Cert[] = [
  {
    name: 'SAP BTP Extensions with SAP Cloud Application Programming Model',
    level: 'SAP Certified Development Associate',
    from: 'Sep 2023',
    to: 'Sep 2028',
    active: true,
  },
  {
    name: 'SAP Build Low-code / No-code Applications and Automations',
    level: 'SAP Certified Citizen Developer Associate',
    from: 'Jan 2024',
    to: 'Jan 2029',
    active: true,
  },
  {
    name: 'SAP Generative AI Developer',
    level: 'SAP Certified Associate',
    from: 'Sep 2025',
    to: 'Sep 2026',
    active: false,
  },
  {
    name: 'SAP Fiori Application Developer',
    level: 'SAP Certified Associate',
    from: 'Sep 2025',
    to: 'Sep 2026',
    active: false,
  },
];

export const otherCredentials =
  'Also: SAP BTP Sales Evangelist record of achievement (2023) · Cisco Networking Academy coursework (2024)';

export const education = {
  degree: 'BSc Computer Science and Engineering',
  school: 'Instituto Superior Técnico, Lisbon',
  years: '2019–2022',
};

export const languages = [
  { name: 'Portuguese', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'Spanish', level: 'Advanced' },
  { name: 'German', level: 'B2 · C1 exam Dec 2026' },
];

export const outsideWork = 'Portuguese, living in Vienna. Strength training, Brazilian Jiu-Jitsu, running and guitar.';

export const lookingFor =
  'Interested in solution architecture, solution consulting, technical presales and enterprise AI roles. Based in Vienna, remote-friendly, and open to client travel.';
