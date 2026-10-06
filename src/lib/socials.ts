import { Github01Icon, Linkedin01Icon } from '@hugeicons/core-free-icons';
import { m } from '@paraglide/messages.js';

// Where the Get in touch buttons and the header's email button write to
export const email = 'matthew.akinowittering@gmail.com';

// `inContact`: also a button in the contact panel, not only in the header
export const socials = [
    {
        label: m.social_linkedin,
        href: 'https://www.linkedin.com/in/matthewwittering/',
        icon: Linkedin01Icon,
        inContact: true
    },
    {
        label: m.social_github,
        href: 'https://github.com/mjakinowittering',
        icon: Github01Icon,
        inContact: false
    }
];
