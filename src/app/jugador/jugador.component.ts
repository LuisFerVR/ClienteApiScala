import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent {
  jugador = {
    nombre: '',
    posicion: '',
    dorsal: null
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Jugador a registrar:', this.jugador);
      // Aquí iría la lógica para guardar en la base de datos
      form.reset();
    }
  }
}
