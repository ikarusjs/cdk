import { property, customElement } from 'lit-element';
import { coreLitElement, customElementStyle } from '../../../mixins/core';
import { MDCRipple } from '@material/ripple';

import style from './style.scss';
import template from './template.js';

@customElement('vl-button')
@customElementStyle(style)
export class ButtonElement extends coreLitElement {

  @property() text = 'Button';

  constructor() {
    super(template);
  }

  firstUpdated() {
    this.shadowRoot.querySelectorAll('.mdc-button').forEach(button => new MDCRipple(button))
  }

}
