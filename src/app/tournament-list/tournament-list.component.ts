import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './tournament-list.component.html',
  styleUrl: './tournament-list.component.css'
})
export class TournamentListComponent {
  torneo = {
    nombre: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Torneo a registrar:', this.torneo);
      // Aquí iría la lógica para guardar en la base de datos
      form.reset();
    }
  }
}
