import { useEffect, useState } from 'react';

export default (sectionTitle, firstItem) => {
    const [titleStyle, setTitleStyle] = useState({});

    useEffect(() => {
        if (sectionTitle.current && firstItem.current) {
            setTitleStyle({
                height: sectionTitle.current.clientHeight + firstItem.current.clientHeight,
                marginBottom: -firstItem.current.clientHeight,
            });
        }
    }, [firstItem, sectionTitle]);

    return titleStyle;
};
