import * as properties from './button.theme';
import { Component, Input, booleanAttribute } from '@angular/core';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { CoreBoolean } from '../../../services/theme/Core.theme';
import {
  booleanToCoreBoolean,
  CoreBooleanToBoolean,
} from '../../../services/util/boolean.util';
import { paramNotNull } from '../../../services/util/helper';

@Component({
  standalone: true,
  imports: [NgIf, NgClass, NgTemplateOutlet],
  selector: 'core-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  protected contentClasses?: Record<keyof properties.ButtonClass, string>;

  protected $color: keyof properties.ButtonColors = 'info';
  protected $size: keyof properties.ButtonSizes = 'md';
  protected $pill: keyof CoreBoolean = 'disabled';
  protected $outline: keyof properties.ButtonFill = 'solid';
  protected $disabled: keyof CoreBoolean = 'disabled';
  protected $gradientMonochrome?: keyof properties.ButtonMonochromeColors;
  protected $gradientDuoTone?: keyof properties.ButtonDuoToneColors;
  protected $customStyle: Partial<properties.ButtonBaseTheme> = {};
  protected $extraClass: string = '';
  //#endregion
  //#region getter/setter
  /** @default info */
  public get color(): keyof properties.ButtonColors {
    return this.$color;
  }
  @Input() public set color(value: keyof properties.ButtonColors) {
    this.$color = value;
    this.fetchClass();
  }

  /** @default md */
  public get size(): keyof properties.ButtonSizes {
    return this.$size;
  }
  @Input() public set size(value: keyof properties.ButtonSizes) {
    this.$size = value;
    this.fetchClass();
  }

  /** @default false */
  public get pill(): boolean {
    return CoreBooleanToBoolean(this.$pill);
  }
  @Input({ transform: booleanAttribute }) public set pill(value: boolean) {
    this.$pill = booleanToCoreBoolean(value);
    this.fetchClass();
  }

  /** @default solid */
  public get outline(): keyof properties.ButtonFill {
    return this.$outline;
  }
  @Input() public set outline(value: keyof properties.ButtonFill) {
    this.$outline = value;
    this.fetchClass();
  }

  /** @default false */
  public get disabled(): boolean {
    return CoreBooleanToBoolean(this.$disabled);
  }
  @Input({ transform: booleanAttribute }) public set disabled(value: boolean) {
    this.$disabled = booleanToCoreBoolean(value);
    this.fetchClass();
  }

  /** @default undefined */
  public get gradientMonochrome():
    | keyof properties.ButtonMonochromeColors
    | undefined {
    return this.$gradientMonochrome;
  }
  @Input() public set gradientMonochrome(
    value: keyof properties.ButtonMonochromeColors | undefined
  ) {
    this.$gradientMonochrome = value;
    this.fetchClass();
  }

  /** @default undefined */
  public get gradientDuoTone():
    | keyof properties.ButtonDuoToneColors
    | undefined {
    return this.$gradientDuoTone;
  }
  @Input() public set gradientDuoTone(
    value: keyof properties.ButtonDuoToneColors | undefined
  ) {
    this.$gradientDuoTone = value;
    this.fetchClass();
  }

  /** @default {} */
  public get customStyle(): Partial<properties.ButtonBaseTheme> {
    return this.$customStyle;
  }
  @Input() public set customStyle(value: Partial<properties.ButtonBaseTheme>) {
    this.$customStyle = value;
    this.fetchClass();
  }

  /** @default {} */
  public get extraClass(): string {
    return this.$extraClass;
  }
  @Input() public set extraClass(value: string) {
    this.$extraClass = value;
  }

  //#endregion

  //#region BaseComponent implementation
  protected fetchClass() {
    if (
      paramNotNull(
        this.$color,
        this.$disabled,
        this.$outline,
        this.$pill,
        this.$size,
        this.$customStyle
      )
    ) {
      const propertyClass = properties.getClasses({
        color: this.$color,
        disabled: this.$disabled,
        outline: this.$outline,
        pill: this.$pill,
        size: this.$size,
        gradientMonochrome: this.$gradientMonochrome,
        gradientDuoTone: this.$gradientDuoTone,
        customStyle: this.$customStyle,
      });

      this.contentClasses = propertyClass;
    }
  }
  //#endregion
}
