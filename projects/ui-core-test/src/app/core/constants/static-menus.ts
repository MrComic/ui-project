import {
  faArchive,
  faCheckCircle,
  faCog,
  faHome,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { Menu } from '../../../../../ui-core/src/lib/layout/sidebar/menu/menu/menu.component';

const Menus: Menu[] = [
  new Menu('Home', ['/'], faHome),
  new Menu('BaseInformation.Menu', [], faCog, [
    new Menu('BaseInformation.Scopes', ['/', 'scopes']),
    new Menu('BaseInformation.ScopeSubjectBags', ['/', 'scope-subject-bag']),
    new Menu('BaseInformation.AiPrompts', ['/', 'scopes']),
  ]),
];
export default Menus;
