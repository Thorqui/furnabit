/* ============================================================
   FURNABIT — Entorno inmersivo (Three.js / WebGL)
   Malla de superficie deformada por ruido simplex en el vertex
   shader. Color por altura (azul profundo -> chispa naranja),
   niebla para fundir con el fondo de la página, y parallax doble
   (cursor + scroll). Degrada con elegancia: sin WebGL o con
   prefers-reduced-motion, deja el gradiente CSS de respaldo.
   ============================================================ */
import * as THREE from "three";

const canvas = document.getElementById("scene");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Marca el fallback CSS y sale sin tocar el canvas. */
function bailToFallback(reason) {
  document.documentElement.classList.add("webgl-failed");
  if (canvas) canvas.style.display = "none";
  const mesh = document.getElementById("hud-mesh");
  if (mesh) mesh.textContent = "mesh · " + reason;
}

if (!canvas) {
  bailToFallback("sin canvas");
} else {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (err) {
    bailToFallback("webgl no disponible");
  }

  if (renderer) {
    boot(renderer);
  }
}

function boot(renderer) {
  const BG = new THREE.Color(0x0a1422);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.085);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  const CAM_BASE = new THREE.Vector3(0, 3.0, 9.2);
  camera.position.copy(CAM_BASE);
  camera.lookAt(0, 0.2, -2);

  renderer.setClearColor(BG, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  /* --- Superficie deformante --- */
  const SEG = 150;
  const geometry = new THREE.PlaneGeometry(34, 34, SEG, SEG);

  const uniforms = {
    uTime:   { value: 0 },
    uMouse:  { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uColorLow:  { value: new THREE.Color(0x1d4a7c) }, // azul profundo
    uColorMid:  { value: new THREE.Color(0x4f8fe0) }, // azul luminoso
    uColorHigh: { value: new THREE.Color(0xff7a2f) }, // chispa naranja
  };

  const vertexShader = /* glsl */`
    uniform float uTime;
    uniform vec2  uMouse;
    uniform float uScroll;
    varying float vHeight;
    varying float vFog;

    // Simplex noise 3D (Ashima / Stefan Gustavson)
    vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
    vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vec3 pos = position;
      // Oleaje en varias octavas
      float t = uTime * 0.18;
      float n  = snoise(vec3(pos.x * 0.18, pos.y * 0.18, t)) * 1.35;
      n += snoise(vec3(pos.x * 0.42, pos.y * 0.42, t * 1.6)) * 0.55;
      n += snoise(vec3(pos.x * 0.9,  pos.y * 0.9,  t * 2.2)) * 0.18;

      // Influencia suave del cursor: una cresta que sigue al ratón
      vec2 m = uMouse * 12.0;
      float d = distance(pos.xy, m);
      n += exp(-d * d * 0.02) * 1.4;

      pos.z += n;
      vHeight = n;

      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      vFog = -mv.z;
      gl_Position = projectionMatrix * mv;
    }
  `;

  const fragmentShader = /* glsl */`
    precision highp float;
    uniform vec3 uColorLow;
    uniform vec3 uColorMid;
    uniform vec3 uColorHigh;
    varying float vHeight;
    varying float vFog;

    void main() {
      float h = clamp(vHeight * 0.5 + 0.5, 0.0, 1.0);
      vec3 col = mix(uColorLow, uColorMid, smoothstep(0.15, 0.6, h));
      col = mix(col, uColorHigh, smoothstep(0.78, 1.0, h));
      // Las crestas brillan un poco más
      float glow = smoothstep(0.8, 1.0, h);
      col += glow * 0.25;
      gl_FragColor = vec4(col, 0.92);
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    wireframe: true,
    transparent: true,
  });

  const surface = new THREE.Mesh(geometry, material);
  surface.rotation.x = -Math.PI / 2.35; // se inclina hacia la cámara
  surface.position.y = -1.4;
  scene.add(surface);

  const hudMesh = document.getElementById("hud-mesh");
  if (hudMesh) hudMesh.textContent = "mesh · " + ((SEG + 1) * (SEG + 1)).toLocaleString("es") + " vértices";

  /* --- Estado de interacción --- */
  const target = { mx: 0, my: 0, scroll: 0 };
  const current = { mx: 0, my: 0, scroll: 0 };
  const hudCoords = document.getElementById("hud-coords");

  window.addEventListener("pointermove", (e) => {
    target.mx = (e.clientX / window.innerWidth) * 2 - 1;
    target.my = -((e.clientY / window.innerHeight) * 2 - 1);
    if (hudCoords) hudCoords.textContent = `x ${target.mx.toFixed(3)} · y ${target.my.toFixed(3)}`;
  }, { passive: true });

  const onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    target.scroll = Math.min(window.scrollY / max, 1);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Resize (debounced) --- */
  let resizeRaf = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
    });
  });

  /* --- FPS HUD --- */
  const hudFps = document.getElementById("hud-fps");
  let fpsAcc = 0, fpsFrames = 0, fpsLast = performance.now();

  /* --- Bucle de render --- */
  const clock = new THREE.Clock();
  let running = true;

  function renderFrame() {
    const dt = clock.getDelta();
    const t = clock.elapsedTime;

    // Suavizado (lerp) de toda la interacción -> sensación física
    const ease = 1 - Math.pow(0.0015, dt); // independiente del framerate
    current.mx += (target.mx - current.mx) * ease;
    current.my += (target.my - current.my) * ease;
    current.scroll += (target.scroll - current.scroll) * ease;

    uniforms.uTime.value = t;
    uniforms.uMouse.value.set(current.mx, current.my);
    uniforms.uScroll.value = current.scroll;

    // Parallax de cámara: el cursor inclina la vista; el scroll hace dolly
    camera.position.x = CAM_BASE.x + current.mx * 1.4;
    camera.position.y = CAM_BASE.y - current.my * 0.8 + current.scroll * 1.5;
    camera.position.z = CAM_BASE.z - current.scroll * 3.2;
    camera.lookAt(0, 0.2 + current.scroll * 0.6, -2);

    renderer.render(scene, camera);

    // FPS
    fpsFrames++;
    const now = performance.now();
    if (now - fpsLast >= 500) {
      const fps = Math.round((fpsFrames * 1000) / (now - fpsLast));
      if (hudFps) hudFps.textContent = fps + " fps";
      fpsFrames = 0; fpsLast = now;
    }
  }

  function loop() {
    if (!running) return;
    renderFrame();
    requestAnimationFrame(loop);
  }

  // Primer frame síncrono: la superficie ya está pintada antes del primer
  // requestAnimationFrame, evitando un parpadeo en blanco al cargar.
  uniforms.uTime.value = reduceMotion ? 12.0 : 0.0; // 0.0 enlaza sin salto con el bucle
  renderer.render(scene, camera);

  // prefers-reduced-motion: nos quedamos en ese frame estático, sin bucle.
  if (reduceMotion) {
    if (hudFps) hudFps.textContent = "estático";
  } else {
    loop();
  }

  // Pausa el render cuando la pestaña no está visible (ahorro de batería/GPU).
  document.addEventListener("visibilitychange", () => {
    if (reduceMotion) return;
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      clock.getDelta(); // descarta el salto de tiempo acumulado
      loop();
    }
  });
}
