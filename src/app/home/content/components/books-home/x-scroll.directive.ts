import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appXScroll]'
})
export class XScrollDirective {

  constructor(private el: ElementRef) {}

  @HostListener('wheel', ['$event']) onWheel(event: WheelEvent) {
    this.el.nativeElement.scrollLeft += event.deltaY;
    event.preventDefault();
  }
}
