/* eslint-disable import/prefer-default-export, react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import TopLayout from './TopLayout';

// export const wrapRootElement = ({ element }) => <TopLayout>{element}</TopLayout>;
export const wrapRootElement = ({ element }) => (React.createElement(TopLayout, {}, element));
