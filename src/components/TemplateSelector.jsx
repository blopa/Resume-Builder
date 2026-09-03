/* globals TEMPLATES_LIST */
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

// Hooks
import { useSelector } from '../store/StoreProvider';

// Actions
import { selectResumeTemplate } from '../store/selectors';

const TemplateSelector = ({ onSelect, className }) => {
    const stateTemplate = useSelector(selectResumeTemplate);
    const [resumeTemplate, setResumeTemplate] = useState(stateTemplate);

    const handleChange = useCallback(
        (e) => {
            setResumeTemplate(e.target.value);
            onSelect(e.target.value);
        },
        [onSelect]
    );

    return (
        <Select className={className} value={resumeTemplate} onChange={handleChange} displayEmpty>
            {TEMPLATES_LIST.map((template) => (
                <MenuItem key={uuid()} value={template}>
                    {template.replace(/([a-z\d])([A-Z])/g, '$1 $2')}
                </MenuItem>
            ))}
        </Select>
    );
};

TemplateSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
    className: PropTypes.string,
};

TemplateSelector.defaultProps = {
    className: '',
};

export default TemplateSelector;
