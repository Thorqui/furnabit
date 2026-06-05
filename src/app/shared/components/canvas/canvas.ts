import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Scene3d } from '../../../core/services/scene-3d';

@Component({
  selector: 'app-canvas',
  imports: [],
  templateUrl: './canvas.html',
  styleUrl: './canvas.css',
})
export class Canvas implements AfterViewInit, OnDestroy {
  @ViewChild('sceneCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private scene3d: Scene3d) {}

  ngAfterViewInit(): void {
    if (this.canvasRef?.nativeElement) {
      try {
        const initialized = this.scene3d.init(this.canvasRef.nativeElement);
        if (!initialized) {
          document.documentElement.classList.add('webgl-failed');
        }
      } catch (error) {
        console.error('Canvas initialization error:', error);
        document.documentElement.classList.add('webgl-failed');
      }
    }
  }

  ngOnDestroy(): void {
    this.scene3d.destroy();
  }
}
