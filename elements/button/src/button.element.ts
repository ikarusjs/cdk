import { LitElement, html, property, customElement, css } from 'lit-element';

import style from './button.element.scss';

@customElement( 'eca-button' )
export class ButtonElement extends LitElement {

  static styles = style( { css } );

  @property() name = 'World';

  render() {
    return html`<p>Hello, ${ this.name }!</p>`;
  }
}
