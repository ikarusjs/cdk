import { CSSResult } from 'lit-element';

export interface CustomElementConfig {
  tpl: Function;
  scss?: CSSResult[];
}

export function customElementConfig( config: CustomElementConfig ): ClassDecorator {
  return function( target: any ): any {
    target.styles = config.scss;
    return class extends target {
      constructor() {
        super( config.tpl );
      }
    };
  };
}
