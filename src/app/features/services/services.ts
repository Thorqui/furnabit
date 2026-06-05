import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  capabilities = [
    {
      icon: '<path d="M3 24h26M3 6h26M3 6v18M25 6v18M11 13l3 3-3 3M17 13h4" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
      title: 'Desarrollo Web & Apps',
      description: 'SPAs con Angular, plataformas SaaS y apps móviles nativas e híbridas, cuidadas al pixel.',
      meta: 'Angular · React · PWA · Mobile'
    },
    {
      icon: '<circle cx="16" cy="16" r="5" stroke="var(--accent)" stroke-width="2"/><path d="M16 4v6M16 22v6M4 16h6M22 16h6" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"/>',
      title: 'Backend & APIs',
      description: 'Arquitecturas robustas con Python, APIs REST y GraphQL, microservicios e integraciones.',
      meta: 'Python · FastAPI · PostgreSQL'
    },
    {
      icon: '<rect x="4" y="4" width="24" height="24" rx="4" stroke="var(--accent)" stroke-width="2"/><path d="M4 12h24M12 12v16" stroke="var(--accent)" stroke-width="2"/>',
      title: 'UI/UX & Diseño',
      description: 'Interfaces accesibles, prototipos interactivos y sistemas de diseño escalables.',
      meta: 'Figma · Design System · A11Y'
    },
    {
      icon: '<path d="M16 4l12 7v10l-12 7L4 21V11l12-7z" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/><path d="M4 11l12 7 12-7M16 18v10" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>',
      title: 'DevOps & Cloud',
      description: 'Infraestructura como código, CI/CD, contenedores Docker y despliegues automatizados.',
      meta: 'Docker · AWS · CI/CD · Kubernetes'
    }
  ];
}
