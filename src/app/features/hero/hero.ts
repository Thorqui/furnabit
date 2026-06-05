import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private scrollListener: () => void = () => {};

  ngOnInit(): void {
    this.setupRevealAnimation();
    this.setupParallax();
  }

  private setupRevealAnimation(): void {
    const revealItems = document.querySelectorAll('.reveal');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('IntersectionObserver' in window && !reduceMotion) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

      revealItems.forEach(item => this.observer?.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add('is-visible'));
    }
  }

  private setupParallax(): void {
    const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (parallaxItems.length && !reduceMotion) {
      let ticking = false;
      this.scrollListener = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            const vh = window.innerHeight;
            parallaxItems.forEach(el => {
              const factor = parseFloat((el as HTMLElement).dataset['parallax'] || '0.1');
              const rect = el.getBoundingClientRect();
              const offset = (rect.top + rect.height / 2 - vh / 2) * -factor;
              (el as HTMLElement).style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
            });
            ticking = false;
          });
        }
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
