import { m } from '@paraglide/messages.js';

// The page's sections that can be linked to, in page order. Each href is
// rooted at `/` so it works from the 404 page too; `tone` is the section's
// index-card pill colour. Contact is reached from the hero, not the header.
export const sections = [
    { label: m.nav_projects, href: '/#projects', tone: 'yellow', inNav: true },
    {
        label: m.nav_how_i_work,
        href: '/#how-i-work',
        tone: 'blue',
        inNav: true
    },
    { label: m.nav_career, href: '/#career', tone: 'green', inNav: true },
    { label: m.nav_learning, href: '/#learning', tone: 'pink', inNav: true },
    { label: m.nav_contact, href: '/#contact', tone: 'teal', inNav: false }
] as const;
