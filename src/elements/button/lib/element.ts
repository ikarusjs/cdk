import { property, customElement } from 'lit-element';
import { coreLitElement, customElementConfig } from '@ikarus/core';
import { MDCRipple } from '@material/ripple/component';

import styles from './style.scss';
import template from './template.js';

@customElement( 'vl-button' )
@customElementConfig( {
  tpl: template,
  scss: [ styles ]
} )
export class ButtonElement extends coreLitElement {

  @property() text = 'Button';

  firstUpdated() {
    this.shadowRoot.querySelectorAll( '.mdc-button' ).forEach( button => new MDCRipple( button ) );
  }

}
