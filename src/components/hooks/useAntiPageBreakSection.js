import { useRef } from 'react';

import useAntiPageBreakTitle from './useAntiPageBreakTitle';

/**
 * Wires up the "don't strand a heading at the bottom of a page" hack for one section:
 * the title grows to cover its first item and then pulls back up over it, so a page
 * break can only ever land above the pair.
 *
 * `titleRef`/`titleStyle` go on the section heading. `firstItemProps()` goes on every
 * item of a mapped list — it hands the ref to whichever item renders first and returns
 * nothing for the rest. Sections with a single, non-mapped item use `firstItemRef`.
 */
const useAntiPageBreakSection = () => {
    const sectionTitle = useRef(null);
    const firstItem = useRef(null);
    const titleStyle = useAntiPageBreakTitle(sectionTitle, firstItem);

    return {
        titleRef: sectionTitle,
        titleStyle,
        firstItemRef: firstItem,
        firstItemProps: () => (firstItem.current ? {} : { ref: firstItem }),
    };
};

export default useAntiPageBreakSection;
