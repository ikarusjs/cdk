import { LitElement, CSSResult } from 'lit-element';

export function customElementStyle(styles?: CSSResult) {
	return function (target: any) {
		target.styles = [styles];
	}
}

export class coreLitElement extends LitElement {

	private readonly TEMPLATE_REF: Function;

	constructor(template: Function) {
		super();
		this.TEMPLATE_REF = template;
	}

	render() {
		return this.TEMPLATE_REF(this);
	}

}