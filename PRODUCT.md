# Product Context: Furnabit

## 1. Overview & Vision
**Furnabit** es una plataforma de software tech avanzada diseñada para optimizar flujos de trabajo e infraestructura tecnológica digital. El objetivo de la interfaz pública es transmitir innovación, robustez técnica y una experiencia de desarrollo premium, distanciándose por completo de las plantillas corporativas genéricas.

## 2. Target Audience
* **Perfil principal:** Desarrolladores, ingenieros de software, directores de tecnología (CTOs) y fundadores de empresas del sector tech.
* **Expectativa del usuario:** Interfaces de alto rendimiento, claridad visual inmediata y una navegación fluida que reduzca al mínimo la fatiga cognitiva.

## 3. Design System & Aesthetic Guidelines
Para garantizar la consistencia en todos los componentes creados por el asistente, la interfaz debe ceñirse estrictamente a las siguientes reglas estéticas:

* **Dirección de Arte:** Enfoque basado en el **Organic Modernism** fusionado con interfaces de software modernas. Uso estructural de **Glassmorphism** (paneles traslúcidos, desenfoques de fondo sutiles mediante `backdrop-filter` y bordes finos de un solo píxel).
* **Paleta de Colores:** Gama corporativa basada en tonos **beiges, verdes profundos/tecnológicos y marrones cálidos**. Queda estrictamente prohibido el uso de negros puros (#000) o grises lavados genéricos en fondos y textos.
* **Estructura y Ritmo:** Layouts limpios, asimétricos pero equilibrados, tipografías nítidas y espacios generosos inspirados en la línea visual de plataformas premium como Linear o Attio.

## 4. UX & Performance Standards (Interaction Budget)
* **Velocidad percibida:** Toda microinteracción (estados de hover, transiciones de menús, clics en tarjetas o despliegues de datos) debe responder al instante.
* **Presupuesto de animación:** El tiempo de respuesta de cualquier animación o transición visual debe ser estrictamente **inferior a 300ms**.
* **Físicas de movimiento:** Se descarta el uso de animaciones genéricas de CSS (`ease-in-out` estándar) o efectos elásticos exagerados. Se prioriza el uso de curvas bezier personalizadas o dinámicas de resorte (*spring physics*) para aportar una sensación táctil y fluida.