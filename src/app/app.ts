import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialList } from "./features/materials/material-list/material-list";
import { NavbarComponent } from "./shared/components/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('recycling-project');
}
