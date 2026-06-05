import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech',
  imports: [CommonModule],
  templateUrl: './tech.html',
  styleUrl: './tech.css',
})
export class Tech {
  categories = [
    { title: 'Frontend', items: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'RxJS'] },
    { title: 'Backend', items: ['Python', 'FastAPI', 'Django', 'Node.js'] },
    { title: 'Data & Cloud', items: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS / GCP'] },
    { title: 'Herramientas', items: ['Docker', 'Git', 'Figma', 'CI/CD'] }
  ];
}
