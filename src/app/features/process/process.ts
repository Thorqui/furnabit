import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-process',
  imports: [CommonModule],
  templateUrl: './process.html',
  styleUrl: './process.css',
})
export class Process {
  steps = [
    {
      number: '01',
      title: 'Descubrimiento',
      description: 'Entendemos tu negocio, definimos requisitos y diseñamos la arquitectura técnica ideal.'
    },
    {
      number: '02',
      title: 'Diseño',
      description: 'Prototipos interactivos, validación con usuarios reales y sistema de diseño definido.'
    },
    {
      number: '03',
      title: 'Desarrollo',
      description: 'Sprints cortos, entregas frecuentes, código limpio y testing automatizado.'
    },
    {
      number: '04',
      title: 'Lanzamiento',
      description: 'Despliegue, monitorización, soporte posterior y evolución continua.'
    }
  ];
}
