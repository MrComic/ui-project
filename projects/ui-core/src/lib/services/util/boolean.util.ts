import { CoreBoolean } from '../theme/Core.theme';

export function booleanToCoreBoolean(value: boolean): keyof CoreBoolean {
  return value ? 'enabled' : 'disabled';
}

export function CoreBooleanToBoolean(value: keyof CoreBoolean): boolean {
  return value === 'enabled';
}
