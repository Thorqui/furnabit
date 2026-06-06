import { Component, AfterViewInit } from '@angular/core';
import { Canvas } from './shared/components/canvas/canvas';
import { Header } from './core/layout/header/header';
import { Hero } from './features/hero/hero';
import { Services } from './features/services/services';
import { Tech } from './features/tech/tech';
import { Team } from './features/team/team';
import { Process } from './features/process/process';
import { Contact } from './features/contact/contact';
import { Footer } from './core/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Canvas,
    Header,
    Hero,
    Services,
    Tech,
    Team,
    Process,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  ngAfterViewInit(): void {
    // Add js class first so reveal CSS kicks in, then immediately observe
    document.documentElement.classList.add('js');
    this.setupRevealAnimation();
  }

  private setupRevealAnimation(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealItems = document.querySelectorAll<Element>('.reveal');

    if (!('IntersectionObserver' in window) || reduceMotion) {
      revealItems.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    revealItems.forEach(el => observer.observe(el));
  }
}
