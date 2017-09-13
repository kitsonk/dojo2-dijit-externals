import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { tsx } from '@dojo/widget-core/tsx';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Calendar from './dijit/Calendar';
import Menu from './dijit/Menu';
import MenuItem from './dijit/MenuItem';
import MenuSeparator from './dijit/MenuSeparator';
import AccordionContainer from './dijit/layout/AccordionContainer';
import BorderContainer from './dijit/layout/BorderContainer';
import ContentPane from './dijit/layout/ContentPane';
import TabContainer from './dijit/layout/TabContainer';

import * as css from './styles/app.m.css';

// Because a lot of dijit is polymorphic and the dojo-typings don't currently fully reflect that, and
// TypeScript is enforcing attributes on elements, we are adding some injected properties to the
// Dijit instances
declare global {
	namespace dijit {
		interface MenuBar {
			region: string;
		}

		namespace layout {
			interface AccordionContainer {
				minSize: number;
				region: string;
				splitter: boolean;
			}

			interface ContentPane {
				selected: boolean;
			}

			interface TabContainer {
				region: string;
			}
		}
	}
}

export default class App extends WidgetBase {
	protected render() {
		return [
			<Menu id="submenu1" contextMenuForWindow={true} style="display:none;">
				<MenuItem key="enabled" onClick={() => alert('Hello World')} label="Enabled Item" />
				<MenuItem key="disabled" label="Disabled Item" disabled={true} />
				<MenuSeparator />
				<MenuItem key="cut" iconClass="dijitIconCut" onClick={() => alert('not actually cutting anything. Just a test!')} label="Cut" />
			</Menu>,
			<BorderContainer id={css.main} liveSplitters={false} design="sidebar">
				<AccordionContainer region="leading" splitter={true} minSize={20} style="width: 300px" id={css.leftAccordion}>
					<ContentPane key="popups" title="Popups and Alterts"></ContentPane>
					<ContentPane key="tree" title="Tree"></ContentPane>
					<ContentPane key="calendar" id="paneCalendar" selected={true} title="Calendar">
						<Calendar id="calendar1" />
					</ContentPane>
				</AccordionContainer>
				<TabContainer region="center" tabStrip={true} id="topTabs">
					<ContentPane id="basicFormTab" title="Basic Form Widgets" style="padding:10px;display:none;"></ContentPane>
				</TabContainer>
			</BorderContainer>
		];
	}
}
