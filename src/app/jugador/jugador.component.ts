import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Jugador {
  nombre: string;
  posicion: string;
  dorsal: number | null;
}

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent {
  jugador: Jugador = {
    nombre: '',
    posicion: '',
    dorsal: null
  };

  jugadores: Jugador[] = [];  // Array para almacenar múltiples jugadores

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Jugador a registrar:', this.jugador);
      
      // Agregamos el jugador al array
      this.jugadores.push({ ...this.jugador });
      
      // Limpiamos el formulario
      form.resetForm();
      this.jugador = { nombre: '', posicion: '', dorsal: null };
    }
  }

  eliminarJugador(index: number) {
    // Eliminamos el jugador del array usando su índice
    this.jugadores.splice(index, 1);
  }
}