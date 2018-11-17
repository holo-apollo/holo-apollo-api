import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import TextFieldWithCounter from '../index';

storiesOf('Inputs', module).add('TextFieldWithCounter', () => (
  <div style={{ width: '420px' }}>
    <TextFieldWithCounter
      label={text('Label text', 'What is being sold in your store?')}
      error={boolean('Error', false)}
      multiline={boolean('Multiline', true)}
      name="name"
      maxLength={100}
    />
  </div>
));
