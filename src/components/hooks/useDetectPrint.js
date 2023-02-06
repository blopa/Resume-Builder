// Code from https://github.com/gregnb/use-detect-print/blob/master/src/index.js
import { useState, useEffect } from 'react';

function useDetectPrint() {
    const [isPrinting, toggleStatus] = useState(false);

    useEffect(() => {
        const printMq = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('print');
        const mqEvent = (mqList) => toggleStatus(!!mqList.matches);

        printMq.addListener(mqEvent);
        return () => printMq.removeListener(mqEvent);
    });

    return isPrinting;
}

export default useDetectPrint;
