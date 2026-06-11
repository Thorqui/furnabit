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
      title: 'Diagnóstico',
      description: 'Evaluamos la viabilidad de tu idea y la madurez de tu operativa. Antes de trazar una sola línea de código, nos alineamos con tus objetivos de negocio para asegurar que el proyecto tiene un retorno real.'
    },
    {
      number: '02',
      title: 'Co-diseño',
      description: 'Estructuramos la arquitectura y la experiencia de usuario de tu software. En esta fase tu feedback es obligatorio: aprobamos juntos el plano técnico y visual antes de pasar a la fase de ingeniería.'
    },
    {
      number: '03',
      title: 'Ingeniería ágil',
      description: 'Desarrollamos mediante sprints cortos y entregas funcionales periódicas. Podrás auditar el avance real del software de forma continua, asegurando que el producto evoluciona exactamente según lo acordado.'
    },
    {
      number: '04',
      title: 'Despliegue y Evolución',
      description: 'Ponemos el sistema en producción bajo un estricto control de calidad. Una vez lanzado, nos mantenemos a tu lado: el soporte y la optimización continua están garantizados por contrato, no son un extra.'
    }
  ];
}

// COMENTARIO DE TEXTO ALTERNATIVO:
// 01 / Alineación EstratégicaAnalizamos a fondo tus procesos actuales y tus retos. No aceptamos un proyecto sin entender primero el impacto económico y operativo que nuestra tecnología aportará a tu empresa.02 / Arquitectura y PrototipadoDefinimos la lógica interna y el diseño de la interfaz. Validamos cada flujo contigo antes de construir nada, garantizando que la solución final encaje al milímetro con tus necesidades.03 / Desarrollo ContinuoConstruimos el software en bloques iterativos. Esto te permite testear la herramienta en entornos reales de forma prematura, eliminando sorpresas de última hora y optimizando los tiempos de entrega.04 / Lanzamiento y CoberturaDesplegamos la herramienta listos para el uso real de tu equipo o clientes. El soporte posterior y la seguridad del sistema están integrados de serie para que delegues la tecnología con total seguridad.
