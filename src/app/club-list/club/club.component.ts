import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Club } from '../../shared/models/club.model';
import { Jugador } from '../../shared/models/jugador.model';
import { ClubService } from '../club/club.service';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  equipo: Club = {
    nombre: '',
    jugadores: []
  };
  equipos: Club[] = [];
  jugadoresDisponibles: Jugador[] = [];
  loading = false;
  error = '';

  constructor(private clubService: ClubService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.loading = true;
    // Cargar equipos y jugadores
    this.clubService.getEquipos().subscribe({
      next: (equipos) => {
        this.equipos = equipos;
        this.cargarJugadores();
      },
      error: (error) => {
        console.error('Error al cargar equipos:', error);
        this.error = 'Error al cargar los equipos';
        this.loading = false;
      }
    });
  }

  cargarJugadores() {
    this.clubService.getJugadores().subscribe({
      next: (jugadores) => {
        this.jugadoresDisponibles = jugadores;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar jugadores:', error);
        this.error = 'Error al cargar los jugadores';
        this.loading = false;
      }
    });
  }

  // Nueva función para editar un equipo
  editarEquipo(equipo: Club) {
    this.equipo = { ...equipo }; // Cargar los datos del equipo seleccionado en el formulario
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      if (this.equipo.id) {
        // Actualizar equipo existente
        this.clubService.updateEquipo(this.equipo.id, this.equipo).subscribe({
          next: () => {
            this.cargarDatos();
            this.resetForm(form);
          },
          error: (error) => {
            console.error('Error al actualizar equipo:', error);
            this.error = 'Error al actualizar el equipo';
            this.loading = false;
          }
        });
      } else {
        // Crear nuevo equipo
        this.clubService.createEquipo(this.equipo).subscribe({
          next: () => {
            this.cargarDatos();
            this.resetForm(form);
          },
          error: (error) => {
            console.error('Error al crear equipo:', error);
            this.error = 'Error al crear el equipo';
            this.loading = false;
          }
        });
      }
    }
  }

  eliminarEquipo(id: number) {
    if (confirm('¿Está seguro de eliminar este equipo?')) {
      this.loading = true;
      this.clubService.deleteEquipo(id).subscribe({
        next: () => {
          this.cargarDatos();
        },
        error: (error) => {
          console.error('Error al eliminar equipo:', error);
          this.error = 'Error al eliminar el equipo';
          this.loading = false;
        }
      });
    }
  }

  obtenerNombreJugador(id: number): string {
    const jugador = this.jugadoresDisponibles.find(j => j.id === id);
    return jugador ? jugador.nombre : 'Jugador no encontrado';
  }

  public resetForm(form?: NgForm) {
    if (form) {
      form.resetForm();
    }
    this.equipo = {
      nombre: '',
      jugadores: []
    };
  }

  hasJugadores(equipo: any): boolean {
    return equipo.jugadores && equipo.jugadores.length > 0;
  }
}
