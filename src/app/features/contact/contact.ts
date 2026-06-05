import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = signal('');
  email = signal('');
  message = signal('');
  formMessage = signal('');
  formMessageType = signal<'success' | 'error'>('error');

  onSubmit(): void {
    if (!this.name().trim() || !this.email().trim() || !this.message().trim()) {
      this.formMessage.set('Por favor, completa todos los campos.');
      this.formMessageType.set('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email())) {
      this.formMessage.set('Introduce un email válido.');
      this.formMessageType.set('error');
      return;
    }

    this.formMessage.set('Mensaje enviado. Nos pondremos en contacto pronto.');
    this.formMessageType.set('success');

    this.name.set('');
    this.email.set('');
    this.message.set('');

    setTimeout(() => this.formMessage.set(''), 3000);
  }
}
