import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  menuOpen  = signal(false);
  isScrolled = signal(false);
  isDark    = signal(true);

  ngOnInit(): void {
    // Restore saved theme
    const saved = localStorage.getItem('furnabit-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    this.isDark.set(dark);
    this.applyTheme(dark);

    window.addEventListener('scroll', () => {
      this.isScrolled.set(window.scrollY > 24);
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) this.menuOpen.set(false);
    });
  }

  toggleTheme(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    this.applyTheme(next);
    localStorage.setItem('furnabit-theme', next ? 'dark' : 'light');
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
}
