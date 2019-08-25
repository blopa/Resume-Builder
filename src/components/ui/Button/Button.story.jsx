import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import Button from './Button';

storiesOf('UI/Button', module)
    .addDecorator(centered)
    .add('Default white theme', () => <Button>Default white button</Button>)
    .add('Blue theme', () => <Button theme="blue">Primary blue button</Button>);
