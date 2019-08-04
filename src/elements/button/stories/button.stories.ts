import { storiesOf } from '@storybook/html';
import markdown from '../README.md';

import '../lib/element';

storiesOf( 'Button', module )
  .add( 'default', () => document.createElement( 'vl-button' ), { notes: { markdown } } );
