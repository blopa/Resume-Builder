import React from 'react';
import ItemInput from './ItemInput';
import uuid from 'uuid';

const ItemsList = ({ onClick, label, checked }) => (
    <li key={uuid()}>
        <ItemInput
            onChange={onClick}
            label={label}
            checked={checked}
        />
    </li>
);

export default ItemsList;
