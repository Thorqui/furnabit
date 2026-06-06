import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services implements AfterViewInit, OnDestroy {
  private st: ScrollTrigger | null = null;
  private tl: gsap.core.Timeline | null = null;

  constructor(private el: ElementRef) {}

  capabilities = [
    {
      title: 'Una aplicación hecha para tu negocio',
      description: 'Si necesitas una plataforma para tus clientes, una herramienta interna para tu equipo o una app móvil, la construimos desde cero adaptada a cómo funciona tu empresa.',
    },
    {
      title: 'Ahorra horas eliminando trabajo manual',
      description: 'Conectamos el software que ya usas —facturas, pedidos, clientes— y automatizamos los pasos repetitivos. Tu equipo gana tiempo; tú ganas tranquilidad.',
    },
    {
      title: 'Una imagen digital que genera confianza',
      description: 'La web o app con la que te ven tus clientes dice mucho de tu empresa. Diseñamos interfaces claras y profesionales que convierten visitas en oportunidades reales.',
    },
    {
      title: 'Que todo funcione, sin que tengas que ocuparte',
      description: 'Después del lanzamiento nos encargamos de que tu producto esté siempre disponible, actualizado y seguro. Tú te centras en tu negocio; nosotros en la tecnología.',
    }
  ];

  ngAfterViewInit(): void {
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || reduceMotion) return;

    requestAnimationFrame(() => requestAnimationFrame(() => this.initPin()));
  }

  private initPin(): void {
    const section = this.el.nativeElement as HTMLElement;
    const slides = Array.from(
      section.querySelectorAll('.service-slide') as NodeListOf<HTMLElement>
    );
    if (slides.length < 2) return;

    // Alternating directions: vertical → horizontal → vertical (ends vertical)
    slides.slice(1).forEach((slide, i) => {
      if (i % 2 === 0) {
        gsap.set(slide, { yPercent: 100 });  // from below
      } else {
        gsap.set(slide, { xPercent: 100 });  // from right
      }
    });

    this.tl = gsap.timeline();

    slides.slice(1).forEach((slide, i) => {
      if (i % 2 === 0) {
        this.tl!.to(slide, { yPercent: 0, duration: 1, ease: 'none' });
      } else {
        this.tl!.to(slide, { xPercent: 0, duration: 1, ease: 'none' });
      }
    });

    // El slide 04 ha llegado. La sección entera se desvanece a 0.
    // El spacer de GSAP (ver abajo) bloquea el canvas → no hay flash de malla.
    this.tl.to(section, { opacity: 0, duration: 0.35, ease: 'none' });

    this.st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${(slides.length - 1 + 0.35) * window.innerHeight}`,
      pin: true,
      scrub: 0.2,
      animation: this.tl,
      invalidateOnRefresh: true,
    });

    // GSAP envuelve la sección en un div.gsap-pin-spacer al hacer pin.
    // Sin background, el canvas se cuela cuando la sección llega a opacity 0.
    // Lo fijamos aquí, en el siguiente frame, cuando el spacer ya existe.
    requestAnimationFrame(() => {
      const spacer = section.parentElement;
      if (spacer && spacer !== section.closest('main')) {
        spacer.style.setProperty('background', 'var(--bg)');
      }
    });
  }

  ngOnDestroy(): void {
    this.tl?.kill();
    this.st?.kill();
    const spacer = (this.el.nativeElement as HTMLElement).parentElement;
    if (spacer) spacer.style.removeProperty('background');
  }
}
