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
      title: 'Frontend Lead',
      role: 'Angular · TypeScript · UI/UX',
      description: 'Interfaces rápidas, accesibles y con diseño cuidado al pixel.'
    },
    {
      avatar: 'BL',
      title: 'Backend Lead',
      role: 'Python · APIs · Arquitectura',
      description: 'Sistemas robustos, escalables y seguros desde el primer commit.'
    },
    {
      avatar: 'FS',
      title: 'Full Stack',
      role: 'React · Node.js · DevOps',
      description: 'El puente entre front y back: despliegues, pipelines y automatización.'
    },
    {
      avatar: 'UX',
      title: 'UX Designer',
      role: 'Figma · Prototyping · Research',
      description: 'Diseño con datos, no con opiniones. Cada decisión visual tiene un porqué.'
    }
  ];
}
