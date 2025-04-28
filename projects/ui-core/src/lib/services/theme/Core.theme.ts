export type CoreHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type CoreTheme = 'dark' | 'light';

export interface CoreBoolean {
  enabled: string;
  disabled: string;
}

export interface CoreStateColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
}

export interface CoreColors extends CoreStateColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  dark: string;
  gray: string;
  green: string;
  indigo: string;
  light: string;
  lime: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
}

export interface CoreGradientColors extends Omit<CoreStateColors, 'warning'> {
  [key: string]: string;
  cyan: string;
  lime: string;
  pink: string;
  purple: string;
  teal: string;
}

export interface CoreGradientDuoToneColors {
  cyanToBlue: string;
  greenToBlue: string;
  pinkToOrange: string;
  purpleToBlue: string;
  purpleToPink: string;
  redToYellow: string;
  tealToLime: string;
}

export interface CorePositions {
  'bottom-left': string;
  'bottom-right': string;
  'bottom-center': string;
  'top-left': string;
  'top-center': string;
  'top-right': string;
  'center-left': string;
  center: string;
  'center-right': string;
}

export interface CoreSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface CoreContentPositions {
  center: string;
}

export interface FlowbitePositions {
  'bottom-left': string;
  'bottom-right': string;
  'bottom-center': string;
  'top-left': string;
  'top-center': string;
  'top-right': string;
  'center-left': string;
  center: string;
  'center-right': string;
}

export interface CoreClass {
  rootClass: string;
}
