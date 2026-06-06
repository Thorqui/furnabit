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
      title: 'Lead de Producto',
      role: 'Interfaces · Experiencia · Diseño',
      description: 'Convierte las necesidades de tu negocio en interfaces que tus clientes entienden sin formación previa.'
    },
    {
      avatar: 'BL',
      title: 'Lead Técnico',
      role: 'Arquitectura · Sistemas · Seguridad',
      description: 'Toma las decisiones técnicas que hacen que tu producto escale sin romperse cuando más lo necesitas.'
    },
    {
      avatar: 'FS',
      title: 'Desarrollo e Integraciones',
      role: 'Producto · Automatización · Cloud',
      description: 'Une las piezas: conecta sistemas, automatiza procesos y mantiene todo funcionando en producción.'
    },
    {
      avatar: 'UX',
      title: 'Diseño de Experiencia',
      role: 'UX · Investigación · Prototipado',
      description: 'Diseña con datos reales. Cada decisión de interfaz tiene un porqué basado en cómo usan tu producto los usuarios.'
    }
  ];
}
