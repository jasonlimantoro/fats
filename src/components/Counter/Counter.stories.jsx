import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Counter from './Counter';

storiesOf('Button', module).add('with text', () => (
  <Counter onAdd={action('onAdd')} onMinus={action('onMinus')} counter={1} />
));
