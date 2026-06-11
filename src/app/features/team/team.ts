import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  members = [
    {
      avatar: 'FL',
      title: 'Lead de Producto & Estrategia',
      role: 'Negocio · Viabilidad · Arquitectura Funcional',
      description: 'El nexo entre tu visión comercial y la ejecución técnica. Analiza tus procesos para estructurar un software que resuelva problemas reales de tu negocio desde el primer día.'
    },
    {
      avatar: 'BL',
      title: 'Lead de Arquitectura & Sistemas',
      role: 'Infraestructura · Seguridad · Escalabilidad',
      description: 'Diseña los cimientos técnicos de la plataforma. Toma las decisiones críticas que garantizan que el sistema sea invulnerable, rápido y capaz de absorber miles de usuarios sin romper la operativa.'
    },
    {
      avatar: 'FS',
      title: 'Ingeniería de Desarrollo e Integraciones',
      role: 'Automatización · Cloud · Lógica de Negocio',
      description: 'El núcleo ejecutor de la ingeniería de software. Conecta tus herramientas actuales, automatiza los flujos de trabajo internos y despliega el código en entornos cloud de alta disponibilidad.'
    },
    {
      avatar: 'UX',
      title: 'Especialista en Experiencia de Usuario (UX/UI)',
      role: 'Interfaces · Optimización · Flujos de Trabajo',
      description: 'Traduce la complejidad técnica en pantallas intuitivas. Diseña interfaces profesionales y flujos de navegación limpios para que tus clientes o tu equipo adopten la herramienta sin fricciones ni curvas de aprendizaje.'
    }
  ];
}
