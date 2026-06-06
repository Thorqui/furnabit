# Product Context: Furnabit

## 1. Overview & Vision
**Furnabit** es una empresa de desarrollo de software a medida para empresas (PYMEs). La web transmite confianza, criterio y precisión — no tecnología por tecnología. El visitante típico es un CEO, director de operaciones o responsable de negocio que evalúa si Furnabit es el equipo adecuado para su proyecto. No es técnico.

## 2. Target Audience
- **Perfil principal:** Directores de empresa, CEOs y responsables de negocio de PYMEs españolas que quieren digitalizar procesos o construir su propio producto digital.
- **Perfil secundario:** CTOs y directores de tecnología que buscan un socio técnico de calidad.
- **Expectativa del usuario:** Una web clara, sin ruido, que responda rápido a "¿puedo confiar en este equipo?".

## 3. Register
`brand` — la web es el producto visible. El diseño construye confianza, no solo informa.

## 4. Design System: Minimalist Dual-Theme
La interfaz utiliza un sistema de dos temas togglable: oscuro por defecto, claro disponible. El toggle se controla vía `data-theme="dark"` / `data-theme="light"` en `<html>`.

### Filosofía
- **Minimalismo preciso** — cada elemento tiene una razón. Nada decorativo sin función.
- **Sin glassmorphism** — superficies sólidas con bordes sutiles de 1px.
- **Sin degradados en texto** — siempre color sólido.
- **Border-radius máximo en cards:** 12px. Botones primarios: 8px (no pill).
- Los CTA usan pill solo para chips pequeños (estado, etiquetas).

### Tokens (Dark / Light via CSS custom properties)
```
--bg / --bg-surface / --bg-hover
--ink / --ink-muted / --ink-dim
--border / --border-hover
--accent (naranja oklch 0.74 0.16 54)
--accent-soft / --accent-ink
```

### Fuentes
- Display: Bricolage Grotesque (headings)
- Body: Hanken Grotesk
- Mono: JetBrains Mono (etiquetas técnicas, código)

### Acento de marca
Naranja `oklch(0.74 0.16 54)` — identidad central de Furnabit. No cambiar.

## 5. Motion
- UI animations < 300ms. Curvas personalizadas (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Reveal: `translateY(24px) + opacity` sobre 600ms con `ease-out-expo`.
- Sin rebote, sin elástico. `prefers-reduced-motion` siempre implementado.
- Botones: `scale(0.97)` en `:active`.

## 6. Canvas WebGL
El canvas Three.js está presente pero es ambiental, no el centro del diseño.
- En dark: `opacity: 1` (ambiente sutil).
- En light: `opacity: 0` (invisible, el fondo limpio es suficiente).

## 7. Copy & Comunicación
- Sin jerga técnica sin traducción a beneficio de negocio.
- CTA principal en todas las páginas: **"Solicitar auditoría inicial"**.
- Sin em dashes (—). Sin buzzwords (innovador, disruptivo, seamless).
- Sin cadencia aphorística repetida sección a sección.

## 8. Absolute Bans
- Glassmorphism como por defecto.
- Degradado en texto (`background-clip: text`).
- Tarjetas idénticas en grid (icon + title + text × N).
- Franja de borde lateral (`border-left` decorativo).
- `border-radius > 16px` en cards y secciones.
- Eyebrow uppercase sobre cada sección (se usa en mono como etiqueta deliberada, no como scaffolding).
