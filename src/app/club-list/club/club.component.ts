import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  equipo = {
    nombre: '',
    jugadores: [] as number[] // Lista de IDs de jugadores seleccionados
  };

  jugadoresDisponibles: Array<{ id: number, nombre: string }> = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' }
  ];

  onSubmit(form: any) {
    if (form.valid) {
      const equipoRegistrado = {
        nombre: this.equipo.nombre,
        jugadores: this.equipo.jugadores
      };
      
      console.log('Equipo a registrar:', equipoRegistrado);
      
      // Reseteamos el formulario completo
      this.equipo.nombre = '';
      this.equipo.jugadores = [];
      form.resetForm();
    }
  }
}
