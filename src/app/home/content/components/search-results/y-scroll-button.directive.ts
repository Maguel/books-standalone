import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appYScrollButton]'
})
export class YScrollButtonDirective {

  constructor(private el: ElementRef) {}
  @HostListener('click', ['$event'])
  onclick(event: Event) {
    console.log('Voy a scrollear hacia arriba.')
    event.stopPropagation();
    const element = this.el.nativeElement;
    const parentElement = element.parentElement;
    const start = parentElement.scrollTop;
    const change = 0 - start;
    const duration = 1000; 
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }
      const progress = currentTime - startTime;
      const newScrollPos = this.easeInOutQuad(progress, start, change, duration);
      parentElement.scrollTop = newScrollPos;

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
