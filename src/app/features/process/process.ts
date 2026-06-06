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
      title: 'Escuchamos',
      description: 'Entendemos tu negocio, tus objetivos y el problema concreto que quieres resolver antes de proponer nada.'
    },
    {
      number: '02',
      title: 'Diseñamos',
      description: 'Definimos cómo va a funcionar tu producto y te lo mostramos antes de construir nada. Tu aprobación, siempre.'
    },
    {
      number: '03',
      title: 'Construimos',
      description: 'Trabajamos en fases cortas con entregas frecuentes para que veas el avance real sin tener que esperar meses.'
    },
    {
      number: '04',
      title: 'Lanzamos',
      description: 'Ponemos en marcha tu proyecto y nos quedamos a tu lado. El soporte posterior no es un extra, es parte del trato.'
    }
  ];
}
