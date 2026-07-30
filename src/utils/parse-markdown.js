import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Parsed as full markdown documents, so paragraphs and lists work.
const blockMarkdownKeys = ['description', 'summary', 'reference', 'coverLetter'];

// These are string arrays rendered as bullet lists, one item per <li>, so they are
// parsed inline to keep marked from wrapping every bullet in its own <p>.
const inlineMarkdownKeys = ['highlights', 'courses'];

const parseMarkdownText = (text, inline = false) => {
    const sanitizedMarkdown = DOMPurify.sanitize(text);

    return inline ? marked.parseInline(sanitizedMarkdown) : marked(sanitizedMarkdown);
};

/**
 * Sanitizes and renders every markdown enabled field of a resume so templates can hand
 * the result straight to dangerouslySetInnerHTML. Every path that feeds a template has
 * to go through here — the templates trust their input, including resumes fetched from
 * someone else's GitHub. Runs client side only: DOMPurify needs a real DOM.
 */
export const parseMarkdown = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => parseMarkdown(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
        const value = obj[key];
        if (typeof value === 'string' && blockMarkdownKeys.includes(key)) {
            acc[key] = parseMarkdownText(value);
        } else if (Array.isArray(value) && inlineMarkdownKeys.includes(key)) {
            acc[key] = value.map((item) => (typeof item === 'string' ? parseMarkdownText(item, true) : item));
        } else if (typeof value === 'object') {
            acc[key] = parseMarkdown(value);
        } else {
            acc[key] = value;
        }

        return acc;
    }, {});
};
