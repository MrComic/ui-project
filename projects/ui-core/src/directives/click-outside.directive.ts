import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<Event>();
  @Input() excludeSelectors: string[] = [];

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      !this.elRef.nativeElement.contains(target) &&
      !this.excludeSelectors.some((selector) => target.closest(selector))
    ) {
      this.clickOutside.emit(event);
    }
  }
}
