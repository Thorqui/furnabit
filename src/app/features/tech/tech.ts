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
      title: 'Ingeniería 100% interna',
      description: 'Todo el código se escribe en nuestra casa. El equipo con el que te reúnes y define la estrategia es el mismo que pica el software. Sin subcontrataciones, sin intermediarios y sin sorpresas técnicas de última hora.'
    },
    {
      title: 'Presupuesto blindado',
      description: 'Auditamos y cerramos el alcance técnico antes de empezar para garantizar un coste fijo y predecible. Sabrás exactamente tu inversión económica desde el primer día, sin desviaciones ni costes ocultos durante el desarrollo.'
    },
    {
      title: 'Fechas de entrega rigurosas',
      description: 'PEstablecemos un calendario de hitos realista y predecible. Trabajamos con plazos firmes y te reportamos de forma proactiva cada avance de manera que puedas planificar tus lanzamientos comerciales con total seguridad.'
    },
    {
      title: 'Arquitectura escalable a largo plazo',
      description: 'No desarrollamos soluciones temporales ni prototipos inestables. Diseñamos sistemas robustos y limpios, preparados para absorber el crecimiento de tu negocio durante años sin necesidad de rehacer la tecnología desde cero.'
    }
  ];
}
