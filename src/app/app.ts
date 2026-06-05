import { Component } from '@angular/core';
import { Canvas } from './shared/components/canvas/canvas';
import { Header } from './core/layout/header/header';
import { Hero } from './features/hero/hero';
import { Services } from './features/services/services';
import { Tech } from './features/tech/tech';
import { Team } from './features/team/team';
import { Process } from './features/process/process';
import { Contact } from './features/contact/contact';
import { Footer } from './core/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Canvas,
    Header,
    Hero,
    Services,
    Tech,
    Team,
    Process,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
