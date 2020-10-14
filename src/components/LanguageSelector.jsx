import React, { useCallback, useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { IconFlagBR, IconFlagUS, IconFlagES } from 'material-ui-flags';
import { makeStyles } from '@material-ui/core/styles';
import { changeLocale } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    selectLanguage: {
        // '& .MuiButtonBase-root': {
        //     backgroundColor: theme.palette.primary.main,
        // },
        '& .MuiSelect-icon': {
            display: 'none',
        },
        '& .MuiSelect-select.MuiSelect-select': {
            padding: '5px 16px',
        },
    },
}));

const defaultOnLanguageChange = (newLanguage, currentLanguage) => {
    changeLocale(newLanguage);
};

const LanguageSelector = ({ currentLocale, onLanguageChange }) => {
    const [language, setLanguage] = useState(currentLocale);
    const classes = useStyles();

    const handleOnLanguageChange = onLanguageChange || defaultOnLanguageChange;
    const handleChange = useCallback((e) => {
        setLanguage(e.target.value);
        handleOnLanguageChange(e.target.value, language);
    }, [handleOnLanguageChange, language]);

    return (
        <Select
            value={language}
            onChange={handleChange}
            className={classes.selectLanguage}
            disableUnderline
        >
            <MenuItem value="pt-br">
                <IconFlagBR />
            </MenuItem>
            <MenuItem value="en">
                <IconFlagUS />
            </MenuItem>
            <MenuItem value="es">
                <IconFlagES />
            </MenuItem>
        </Select>
    );
};

LanguageSelector.propTypes = {
    // TODO
};

export default LanguageSelector;
