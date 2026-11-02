import type { Prisma } from '../src/generated/prisma/client';

// The business card data. Edit it here, then run `npm run db:reseed` to apply the changes.
export const profileSeed: Prisma.ProfileCreateInput = {
  name: 'Mikhail Shilkin',
  title: 'Frontend Developer',
  description:
    'Frontend Developer specializing in React and TypeScript. Experience building web applications, reusable UI components, REST API integrations, and responsive interfaces.',
  email: null,
  githubUrl: 'https://github.com/MichaelShilkin',
  linkedinUrl: 'https://www.linkedin.com/in/mikhail-shilkin-6105093b6/',
  skills: {
    create: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Vite' },
      { name: 'React Router' },
      { name: 'TanStack Query' },
      { name: 'Zustand' },
      { name: 'REST API' },
      { name: 'GraphQL' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Tailwind CSS' },
      { name: 'Git' },
    ],
  },
  experience: {
    create: [
      {
        company: 'ООО «АрхиТех ИИ»',
        position: 'Frontend Developer',
        startDate: new Date('2026-08-01'),
        endDate: new Date('2026-09-30'),
        achievements:
          'Internship on a web platform for project and task management. Integrated frontend with backend API and implemented authorization, member access management, task hierarchy, and Kanban board restrictions and archiving.',
      },
      {
        company: 'Код Юнити',
        position: 'Frontend Developer — React / TypeScript',
        startDate: new Date('2026-06-01'),
        endDate: new Date('2026-08-31'),
        achievements:
          'Developed SPA pages and reusable components. Integrated REST API, implemented JWT session handling and token refresh, centralized error handling, TanStack Query caching, Zustand state management, and forms with React Hook Form and Zod. Participated in code reviews and refactoring.',
      },
      {
        company: 'ПрофКрепёж',
        position: 'Frontend Developer — React / TypeScript',
        startDate: new Date('2026-07-01'),
        endDate: new Date('2026-09-30'),
        achievements:
          'Developed a B2B corporate website using Next.js App Router. Created reusable UI components, design tokens, SEO metadata, and optimized image and font loading. Participated in code reviews.',
      },
    ],
  },
  projects: {
    create: [
      {
        name: 'АрхиТех ИИ — Project Management Platform',
        description:
          'Web platform for managing projects and tasks, including authorization, team access, task hierarchy, and Kanban board functionality.',
      },
      {
        name: 'Код Юнити',
        description:
          'SPA platform for finding teams and projects, built with React, TypeScript, Vite, React Router, TanStack Query, and Zustand.',
        url: 'https://github.com/MichaelShilkin/Frontend',
      },
      {
        name: 'ПрофКрепёж',
        description:
          'Corporate B2B website for a fasteners supplier, built with Next.js App Router, React, and TypeScript.',
      },
    ],
  },
};
