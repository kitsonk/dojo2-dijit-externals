import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import HelloWorld, { HelloWorldProperties } from './widgets/HelloWorld';
import * as Button from 'dijit/form/Button';
import DijitWrapper from '@dojo/widget-core/util/DijitWrapper';

const DijitButton = DijitWrapper(Button);

export default class App extends WidgetBase<WidgetProperties> {

	private stranger = true;

	private toggleStranger(): void {
		this.stranger = !this.stranger;
		this.invalidate();
	}

	protected render(): DNode {
		const { stranger, toggleStranger } = this;

		return v('div', {}, [
			w(DijitButton, {
				id: 'foo',
				label: 'Click Me!',
				onClick() {
					console.log('I was clicked!');
					return true;
				}
			}),
			w(HelloWorld, { stranger, toggleStranger })
		]);
	}
}
