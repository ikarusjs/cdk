import { html } from 'lit-element';

export default function template(_this) {
  return html`
    <button class="mdc-button mdc-button--raised"> 
      <span class="mdc-button__label">${_this.text}</span> 
    </button>
  `;
}
