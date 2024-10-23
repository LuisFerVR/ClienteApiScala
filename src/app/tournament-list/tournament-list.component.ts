import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './tournament-list.component.html',
  styleUrl: './tournament-list.component.css'
})
export class TournamentListComponent {
  nombre: string = '';
  equiposSeleccionados: number[] = [];
  torneos: Array<{ nombre: string, equipos: number[] }> = [];
  
  equiposDisponibles: Array<{ id: number, nombre: string }> = [
    { id: 1, nombre: 'Equipo A' },
    { id: 2, nombre: 'Equipo B' },
    { id: 3, nombre: 'Equipo C' }
  ];

  cleanData() {
    this.nombre = '';
    this.equiposSeleccionados = [];
  }

  onSubmit(form: any) {
    if (form.valid) {
      const nuevoTorneo = {
        nombre: this.nombre,
        equipos: [...this.equiposSeleccionados] // Clonamos los equipos
      };

      this.torneos.push(nuevoTorneo);
      console.log('Torneos registrados:', this.torneos);

      this.cleanData();
      form.resetForm();
    }
  }

  onDelete(index: number) {
    this.torneos.splice(index, 1);
  }

  // Método para obtener el nombre del equipo según su ID
  obtenerNombreEquipo(equipoId: number): string {
    const equipo = this.equiposDisponibles.find(e => e.id === equipoId);
    return equipo ? equipo.nombre : 'Equipo no encontrado';
  }
}