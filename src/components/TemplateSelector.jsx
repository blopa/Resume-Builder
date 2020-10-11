/* globals TEMPLATES_LIST */
import React, { useCallback, useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import { useIntl } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    // TODO
}));

const TemplateSelector = ({ onSelect, className }) => {
    const intl = useIntl();
    const [resumeTemplate, setResumeTemplate] = useState('Default');
    const classes = useStyles();
    // console.log(TEMPLATES_LIST);

    const handleChange = useCallback((e) => {
        setResumeTemplate(e.target.value);
        onSelect(e.target.value);
    }, [onSelect]);

    return (
        <Select
            className={className}
            value={resumeTemplate}
            onChange={handleChange}
            displayEmpty
        >
            {TEMPLATES_LIST.map((template) => (
                <MenuItem
                    key={uuid()}
                    value={template}
                >
                    {template}
                </MenuItem>
            ))}
        </Select>
    );
};

TemplateSelector.propTypes = {
    // TODO
};

export default TemplateSelector;
