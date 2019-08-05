import { LitElement } from 'lit-element';

export class coreLitElement extends LitElement {

  private readonly TEMPLATE_REF: Function;

  constructor( template: Function ) {
    super();
    this.TEMPLATE_REF = template;
  }

  render() {
    return this.TEMPLATE_REF( this );
  }

}
