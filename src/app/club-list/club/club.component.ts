import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Equipo {
  nombre: string;
  jugadores: number[];
}

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  equipo: Equipo = {
    nombre: '',
    jugadores: []
  };

  equipos: Equipo[] = [];  // Lista para almacenar los equipos registrados

  jugadoresDisponibles: Array<{ id: number, nombre: string }> = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' }
  ];

  onSubmit(form: any) {
    if (form.valid) {
      // Guardamos una copia del equipo en el array
      this.equipos.push({
        nombre: this.equipo.nombre,
        jugadores: [...this.equipo.jugadores]
      });
      
      console.log('Equipo registrado:', this.equipos[this.equipos.length - 1]);
      
      // Reseteamos el formulario
      this.equipo = {
        nombre: '',
        jugadores: []
      };
      form.resetForm();
    }
  }

  eliminarEquipo(index: number) {
    this.equipos.splice(index, 1);
  }

  obtenerNombreJugador(id: number): string {
    const jugador = this.jugadoresDisponibles.find(j => j.id === id);
    return jugador ? jugador.nombre : 'Jugador no encontrado';
  }
}