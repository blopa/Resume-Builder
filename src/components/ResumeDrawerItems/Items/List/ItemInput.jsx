import React, { Fragment } from 'react';
import { v4 as uuid } from 'uuid';
import { capitalize } from '../../../../utils/utils';

const ItemInput = ({
    onChange,
    label = '',
    checked,
}) => {
    const id = uuid();
    return (
        <Fragment>
            <input
                type="checkbox"
                onChange={onChange}
                id={id}
                checked={checked}
            />
            <label htmlFor={id}>
                {capitalize(label)}
            </label>
        </Fragment>
    );
};

export default ItemInput;
