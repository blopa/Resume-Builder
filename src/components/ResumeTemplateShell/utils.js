// Utils
import { isObjectNotEmpty } from '../../utils/utils';

// Links are shown as bare domains — "piedpiper.example.com" rather than
// "http://piedpiper.example.com/" — to keep contact blocks on as few lines as possible.
export const toDisplayUrl = (url) => url?.replace(/^https?:\/\//, '').replace(/\/$/, '');

// Every array-shaped section a template can render below the cover letter.
const RESUME_SECTION_KEYS = [
    'work',
    'skills',
    'education',
    'awards',
    'volunteer',
    'publications',
    'languages',
    'interests',
    'references',
    'projects',
    'certificates',
];

/*
 * Whether anything renders after the cover letter. The cover letter forces a page
 * break when it is followed by a resume, so this decides whether the on-screen
 * "this is a page break" marker is telling the truth — any one populated section is
 * enough, which is why this is an `some` and not an `every`.
 */
export const hasRenderableResumeContent = (jsonResume = {}) =>
    isObjectNotEmpty(jsonResume.basics) || RESUME_SECTION_KEYS.some((key) => jsonResume[key]?.length > 0);
