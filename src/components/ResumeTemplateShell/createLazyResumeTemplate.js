import { lazy } from 'react';

const importDefaultTemplate = () => import('../ResumeTemplates/Default/Index');

const importResumeTemplate = (template) =>
    import(`../ResumeTemplates/${template}/Index`).catch(() => importDefaultTemplate());

const createLazyResumeTemplate = (template) => lazy(() => importResumeTemplate(template));

export default createLazyResumeTemplate;
