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
      title: 'Software a medida sin concesiones',
      description: 'No adaptamos tu empresa a un programa; diseñamos ingeniería desde cero para tu operativa. Desarrollamos plataformas, herramientas internas o apps móviles bajo estándares estrictos de rendimiento. Si buscas una solución definitiva y estás dispuesto a implicarte en su diseño, somos tu equipo.',
    },
    {
      title: 'Automatización de alto rendimiento',
      description: 'Conectamos tus sistemas actuales —facturas, pedidos, CRM— para erradicar el error humano y las tareas repetitivas. No automatizamos procesos mediocres: optimizamos tu flujo de trabajo para que tu equipo rinda al máximo y tú recuperes el control estratégico.',
    },
    {
      title: 'Interfaces de nivel superior que venden',
      description: 'Tu plataforma digital es la carta de presentación de tu solvencia. Huimos de diseños genéricos; creamos interfaces impecables, intuitivas y profesionales que transforman usuarios escépticos en clientes recurrentes. Diseñamos para marcas que exigen liderar su sect',
    },
    {
      title: 'Soporte de Élite y Evolución Continua',
      description: 'El lanzamiento es solo el principio. Nos convertimos en tu departamento tecnológico de confianza para garantizar que tu software esté blindado, actualizado y disponible 24/7. Tú lideras el negocio; nosotros aseguramos que la tecnología jamás sea un freno.',
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
