import { storiesOf } from '@storybook/html';
import markdown from '../README.md';

import '../src/button.element';

storiesOf( 'Demo', module )
  .add( 'heading', () => document.createElement( 'eca-button' ), { notes: { markdown } } );
