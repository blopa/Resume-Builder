import React from 'react';
import { v4 as uuid } from 'uuid';
import ItemInput from './ItemInput';

const ItemsList = ({
    onClick,
    label,
    checked,
}) => (
    <li key={uuid()}>
        <ItemInput
            onChange={onClick}
            label={label}
            checked={checked}
        />
    </li>
);

export default ItemsList;
