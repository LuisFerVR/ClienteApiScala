import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent {
  jugador = {
    nombre: '',
    posicion: '',
    dorsal: null
  };

  jugadorRegistrado = false;
  jugadorRegistradoData: any = null;  // Variable para mantener los datos registrados del jugador

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Jugador a registrar:', this.jugador);
      
      // Guardamos los datos del jugador antes de resetear el formulario
      this.jugadorRegistradoData = { ...this.jugador };

      // Limpiar los campos del formulario, pero mantener los valores del jugador en la tarjeta
      form.resetForm();
      this.jugador = { nombre: '', posicion: '', dorsal: null };

      this.jugadorRegistrado = true;  // Mostramos la tarjeta con los datos del jugador
    }
  }

  eliminarJugador() {
    this.jugadorRegistrado = false;  // Ocultamos la tarjeta cuando eliminamos al jugador
    this.jugadorRegistradoData = null;  // Limpiamos los datos del jugador
  }
}
