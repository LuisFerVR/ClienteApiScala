import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [FormsModule,NgIf, NgFor],
  templateUrl: './tournament-list.component.html',
  styleUrl: './tournament-list.component.css'
})
export class TournamentListComponent {
  nombre: string = '';
  equiposSeleccionados: number[] = [];
  equiposDisponibles: Array<{id:number, nombre:string}> = [
    { id: 1, nombre: 'Equipo A' },
    { id: 2, nombre: 'Equipo B' },
    { id: 3, nombre: 'Equipo C' }
  ];

  onSubmit(form: any) {
    if (form.valid) {
      const torneoEquipos = {
        nombre: this.nombre,
        equipos: this.equiposSeleccionados
      };
      
      console.log('Torneo a registrar:', torneoEquipos);
      
      // Reseteamos el formulario completo
      this.nombre = '';
      this.equiposSeleccionados = [];
      form.resetForm();
    }
  }
}
