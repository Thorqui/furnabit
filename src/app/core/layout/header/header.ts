import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  menuOpen = signal(false);
  isScrolled = signal(false);

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 24);
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) {
        this.menuOpen.set(false);
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }
}
