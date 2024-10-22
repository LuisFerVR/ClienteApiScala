import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent {
  equipo = {
    nombre: '',
    jugador_id: ''
  };

  jugadores: Array<{id: number, nombre: string}> = [
    // Aquí normalmente cargarías los jugadores desde tu servicio/API
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María García' },
    { id: 3, nombre: 'Carlos López' }
  ];

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Equipo a registrar:', this.equipo);
      // Aquí iría la lógica para guardar en la base de datos
      form.reset();
    }
  }
}
