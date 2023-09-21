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
  @HostListener('click', ['$event'])
  onclick(event: Event) {
    event.stopPropagation();
    const start = this.el.nativeElement.scrollLeft;
    const change = 0 - start;
    const duration = 500; // Duración en milisegundos
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }
      const progress = currentTime - startTime;
      const newScrollPos = this.easeInOutQuad(progress, start, change, duration);
      this.el.nativeElement.scrollLeft = newScrollPos;

      if (progress < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
    event.preventDefault();
  }
  easeInOutQuad(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
}
