import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech',
  imports: [CommonModule],
  templateUrl: './tech.html',
  styleUrl: './tech.css',
})
export class Tech {
  guarantees = [
    {
      title: 'Sin subcontrataciones',
      description: 'El equipo que te atiende es el que desarrolla tu proyecto. Sin intermediarios, sin terceros, sin sorpresas de última hora.'
    },
    {
      title: 'Precio cerrado desde el principio',
      description: 'Acordamos un presupuesto antes de empezar y lo cumplimos. Sabes exactamente cuánto cuesta tu proyecto desde el día uno.'
    },
    {
      title: 'Entregas predecibles',
      description: 'Plazos reales. Trabajamos en fases con fechas concretas y te informamos del avance sin que tengas que preguntar.'
    },
    {
      title: 'Un producto que dura',
      description: 'No entregamos prototipos. Lo que construimos está diseñado para crecer con tu empresa durante años, sin rehacer desde cero.'
    }
  ];
}
