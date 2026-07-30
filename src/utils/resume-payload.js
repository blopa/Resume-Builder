import { cloneDeep, omit } from 'lodash';

// Base resume
import baseResume from '../store/resume.json';

// Utils
import { convertToRegularObject, readToggleableText, resolveToggleableText } from './utils';
import { parseMarkdown } from './parse-markdown';

/*
 * Fields the builder stores but no template may render. `careerStory` is the user's
 * private long-form notes — it exists to feed an LLM, never a resume.
 */
const INTERNAL_FIELDS = ['careerStory'];

/*
 * The toggleable store is the source of truth, and two different plain projections of
 * it are needed: one for the templates and one for the download links. They used to be
 * assembled by hand in three places and had already drifted apart, so both start here.
 *
 * `enableSourceDataDownload`, `__translation__`, `meta`, `$schema`, `coverLetter` and
 * `llmPrompt` all sit in convertToRegularObject's ignoredProperties, so they come
 * through the conversion untouched — only the two text attributes need resolving, and
 * how they resolve is the whole difference between rendering and exporting.
 */
const toPlainResume = (toggleableResume, readText) => ({
    ...baseResume,
    ...convertToRegularObject(cloneDeep(toggleableResume)),
    coverLetter: readText(toggleableResume.coverLetter),
    llmPrompt: readText(toggleableResume.llmPrompt),
});

/**
 * What a template renders: disabled entries collapsed, markdown turned into sanitized
 * HTML, internal fields stripped. Pass `includeCoverLetter: false` for the online
 * viewer, which does not support cover letters.
 */
export const toRenderableResume = (toggleableResume, { includeCoverLetter = true } = {}) => {
    const resume = omit(toPlainResume(toggleableResume, resolveToggleableText), INTERNAL_FIELDS);

    return parseMarkdown({
        ...resume,
        coverLetter: includeCoverLetter ? resume.coverLetter : '',
    });
};

/**
 * What a download link serialises: the user's own data, unrendered. Markdown stays
 * markdown and text the user toggled off for printing is still theirs to keep, so this
 * deliberately ignores the `enabled` flags that `toRenderableResume` honours.
 */
export const toExportableResume = (toggleableResume) => toPlainResume(toggleableResume, readToggleableText);
