// This file only exists as a entry point for Gatsby
// Since we're writing jsx and using airbnb ESLint rules
// We should not write jsx into a .js file
import React from 'react';
import HomePage from './Home';

const gatsbyEntryPoint = () => (React.createElement(HomePage));

export default gatsbyEntryPoint;
