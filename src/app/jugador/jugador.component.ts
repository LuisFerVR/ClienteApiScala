import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Jugador } from '../shared/models/jugador.model';
import { JugadorService } from './jugador.service';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {
  jugador: Jugador = {
    nombre: '',
    posicion: '',
    dorsal: 0,
    equipo_id: 1 // Esto deberías obtenerlo de algún lugar, por ejemplo, como parámetro de ruta
  };

  jugadores: Jugador[] = [];
  modoEdicion = false;
  jugadorEditandoIndex: number | null = null;

  constructor(private jugadorService: JugadorService) {}

  ngOnInit() {
    this.cargarJugadores();
  }

  cargarJugadores() {
    this.jugadorService.getJugadores().subscribe({
      next: (data) => {
        this.jugadores = data;
      },
      error: (error) => {
        console.error('Error al cargar jugadores:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.modoEdicion && this.jugador.id) {
        this.jugadorService.updateJugador(this.jugador.id, this.jugador).subscribe({
          next: () => {
            this.cargarJugadores();
            this.resetForm(form);
          },
          error: (error) => {
            console.error('Error al actualizar jugador:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
          }
        });
      } else {
        this.jugadorService.createJugador(this.jugador).subscribe({
          next: () => {
            this.cargarJugadores();
            this.resetForm(form);
          },
          error: (error) => {
            console.error('Error al crear jugador:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
          }
        });
      }
    }
  }

  eliminarJugador(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('¿Está seguro de eliminar este jugador?')) {
      this.jugadorService.deleteJugador(id).subscribe({
        next: () => {
          this.cargarJugadores();
          if (this.jugador.id === id) {
            this.cancelarEdicion();
          }
        },
        error: (error) => {
          console.error('Error al eliminar jugador:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      });
    }
  }

  editarJugador(jugador: Jugador) {
    this.jugador = { ...jugador };
    this.modoEdicion = true;
    this.jugadorEditandoIndex = this.jugadores.findIndex(j => j.id === jugador.id);
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.jugadorEditandoIndex = null;
    this.resetForm();
  }

  private resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.jugador = {
      nombre: '',
      posicion: '',
      dorsal: 0,
      equipo_id: 1
    };
    this.modoEdicion = false;
    this.jugadorEditandoIndex = null;
  }
}