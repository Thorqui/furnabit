import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root',
})
export class Scene3d {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private animationFrameId: number | null = null;
  private uniforms: any = null;
  private time = 0;
  private targetMouse = new THREE.Vector2(0, 0);
  private mouse = new THREE.Vector2(0, 0);

  init(canvas: HTMLCanvasElement): boolean {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
      this.camera.position.set(0, 3.2, 9.5);
      this.camera.lookAt(0, 0, -2);

      // Fondo casi negro con tinte azul frío
      this.renderer.setClearColor(new THREE.Color(0x04080f), 1);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setSize(window.innerWidth, window.innerHeight, false);

      this.uniforms = {
        uTime:        { value: 0 },
        uMouse:       { value: new THREE.Vector2(0, 0) },
        uScroll:      { value: 0 },
        // Paleta fría y técnica
        uColorBase:   { value: new THREE.Color(0x04080f) },   // casi negro
        uColorWire:   { value: new THREE.Color(0x1a5fff) },   // azul eléctrico
        uColorPeak:   { value: new THREE.Color(0x38bfff) },   // cyan frío en picos
        uColorAccent: { value: new THREE.Color(0xff6a1a) }    // acento naranja mínimo
      };

      // ── Terreno principal (más denso) ──────────────────────────
      const geo = new THREE.PlaneGeometry(36, 36, 180, 180);
      geo.rotateX(-Math.PI * 0.35);

      const fillMat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vs(),
        fragmentShader: this.fillFs(),
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      this.scene.add(new THREE.Mesh(geo, fillMat));

      const wireMat = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vs(),
        fragmentShader: this.wireFs(),
        transparent: true,
        wireframe: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      this.scene.add(new THREE.Mesh(geo, wireMat));

      // ── Segunda capa: más alejada, más suave — da profundidad ──
      const uniformsBack = {
        ...this.uniforms,
        uColorWire:   { value: new THREE.Color(0x0d3acc) },  // azul más oscuro
        uColorPeak:   { value: new THREE.Color(0x1a8fff) },
        uColorAccent: { value: new THREE.Color(0xff6a1a) }
      };
      const geoBack = new THREE.PlaneGeometry(44, 44, 100, 100);
      geoBack.rotateX(-Math.PI * 0.35);

      const wireBackMat = new THREE.ShaderMaterial({
        uniforms: uniformsBack,
        vertexShader: this.vsBack(),
        fragmentShader: this.wireBackFs(),
        transparent: true,
        wireframe: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const meshBack = new THREE.Mesh(geoBack, wireBackMat);
      meshBack.position.set(0, -1.2, -4);
      this.scene.add(meshBack);

      window.addEventListener('resize', () => this.onWindowResize());
      document.addEventListener('mousemove', (e) => {
        this.targetMouse.set(
          (e.clientX / window.innerWidth - 0.5) * 2,
          -(e.clientY / window.innerHeight - 0.5) * 2
        );
      });
      window.addEventListener('scroll', () => {
        this.uniforms.uScroll.value = window.scrollY;
      });

      this.animate();
      return true;
    } catch (err) {
      console.error('WebGL initialization failed:', err);
      return false;
    }
  }

  private animate = (): void => {
    if (!this.renderer || !this.scene || !this.camera) return;

    this.time += 0.016;
    this.uniforms.uTime.value = this.time;

    this.mouse.lerp(this.targetMouse, 0.03);
    this.uniforms.uMouse.value.copy(this.mouse);

    // Cámara: deriva + respuesta al ratón más viva
    this.camera.position.x = Math.sin(this.time * 0.06) * 0.5 + this.mouse.x * 0.28;
    this.camera.position.y = 3.2 + Math.cos(this.time * 0.09) * 0.18 + this.mouse.y * 0.14;
    this.camera.lookAt(0, 0, -2);

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private onWindowResize(): void {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  // ─── Vertex shader (compartido) ────────────────────────────────────────────
  private vs(): string {
    return `
      uniform float uTime;
      uniform vec2  uMouse;
      varying float vHeight;
      varying float vDepth;

      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
      float snoise(vec3 v){
        const vec2 C=vec2(1.0/6.0,1.0/3.0);
        const vec4 D=vec4(0.0,0.5,1.0,2.0);
        vec3 i=floor(v+dot(v,C.yyy));
        vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz);
        vec3 l=1.0-g;
        vec3 i1=min(g.xyz,l.zxy);
        vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx;
        vec3 x2=x0-i2+2.0*C.xxx;
        vec3 x3=x0-1.0+3.0*C.xxx;
        i=mod(i,289.0);
        vec4 p=permute(permute(permute(
          i.z+vec4(0.0,i1.z,i2.z,1.0))
          +i.y+vec4(0.0,i1.y,i2.y,1.0))
          +i.x+vec4(0.0,i1.x,i2.x,1.0));
        float n_=1.0/7.0;
        vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.0*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z);
        vec4 y_=floor(j-7.0*x_);
        vec4 x=x_*ns.x+ns.yyyy;
        vec4 y=y_*ns.x+ns.yyyy;
        vec4 h=1.0-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy);
        vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.0+1.0;
        vec4 s1=floor(b1)*2.0+1.0;
        vec4 sh=-step(h,vec4(0.0));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
        vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x);
        vec3 p1=vec3(a0.zw,h.y);
        vec3 p2=vec3(a1.xy,h.z);
        vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
        vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
        m=m*m;
        return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }

      void main(){
        vec3 pos=position;
        float t=uTime*0.16;
        float n=snoise(vec3(pos.x*0.16,pos.y*0.16,t))*1.55;
        n+=snoise(vec3(pos.x*0.38,pos.y*0.38,t*1.5))*0.60;
        n+=snoise(vec3(pos.x*0.85,pos.y*0.85,t*2.1))*0.22;
        n+=snoise(vec3(pos.x*1.8, pos.y*1.8, t*3.0))*0.08;

        // Respuesta al cursor más pronunciada
        vec2 m=uMouse*14.0;
        float d=distance(pos.xy,m);
        n+=exp(-d*d*0.018)*1.8;

        pos.z+=n;
        vHeight=n;

        vec4 mv=modelViewMatrix*vec4(pos,1.0);
        vDepth=-mv.z;
        gl_Position=projectionMatrix*mv;
      }
    `;
  }

  // Fill: sombra oscura que da volumen sin llamar la atención
  private fillFs(): string {
    return `
      precision highp float;
      uniform vec3 uColorBase;
      uniform vec3 uColorWire;
      varying float vHeight;
      varying float vDepth;

      void main(){
        float h=clamp(vHeight*0.5+0.5,0.0,1.0);
        // Tinte muy suave del azul en valles
        vec3 col=mix(uColorBase, uColorWire*0.15, h*0.5);
        // Desvanece con profundidad
        float alpha=smoothstep(14.0,3.0,vDepth)*0.55;
        gl_FragColor=vec4(col,alpha*h*0.6);
      }
    `;
  }

  // Wireframe: líneas eléctricas con intensidad por altura
  private wireFs(): string {
    return `
      precision highp float;
      uniform vec3 uColorWire;
      uniform vec3 uColorPeak;
      uniform vec3 uColorAccent;
      varying float vHeight;
      varying float vDepth;

      void main(){
        float h=clamp(vHeight*0.5+0.5,0.0,1.0);

        // Mezcla de azul eléctrico a cyan en picos, acento naranja muy mínimo en crestas máximas
        vec3 col=mix(uColorWire, uColorPeak, smoothstep(0.5,0.85,h));
        col=mix(col, uColorAccent, smoothstep(0.88,1.0,h)*0.35);

        // Brillo proporcional a la altura + fade en profundidad
        float fade=smoothstep(13.0,2.0,vDepth);
        float alpha=fade*(0.08+h*0.38);

        gl_FragColor=vec4(col,alpha);
      }
    `;
  }

  // Vertex shader de la capa trasera — misma forma pero ligeramente diferente fase
  private vsBack(): string {
    return this.vs().replace(
      'float t=uTime*0.16;',
      'float t=uTime*0.10;'  // más lento, como si estuviese más lejos
    ).replace(
      'vec2 m=uMouse*14.0;',
      'vec2 m=uMouse*7.0;'   // menos influencia del ratón en el fondo
    );
  }

  // Fragment de capa trasera: más tenue
  private wireBackFs(): string {
    return `
      precision highp float;
      uniform vec3 uColorWire;
      uniform vec3 uColorPeak;
      varying float vHeight;
      varying float vDepth;

      void main(){
        float h=clamp(vHeight*0.5+0.5,0.0,1.0);
        vec3 col=mix(uColorWire, uColorPeak, smoothstep(0.4,0.85,h));
        float fade=smoothstep(18.0,4.0,vDepth);
        float alpha=fade*(0.04+h*0.18);
        gl_FragColor=vec4(col,alpha);
      }
    `;
  }

  destroy(): void {
    if (this.animationFrameId !== null) cancelAnimationFrame(this.animationFrameId);
    this.renderer?.dispose();
  }
}
