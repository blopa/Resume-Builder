import { configure } from '@storybook/react';

const requireContext = require.context('../src', true, /.story.jsx/);

function loadStories() {
    // eslint-disable-next-line global-require
    require('../src/styles/index');
    requireContext.keys().forEach((filename) => requireContext(filename));
}

configure(loadStories, module);
