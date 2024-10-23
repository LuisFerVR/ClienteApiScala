import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TorneoService } from '../tournament-list/tournament.service';
import { ClubService } from '../club-list/club/club.service';
import { Torneo } from '../shared/models/torneo.model';
import { Club } from '../shared/models/club.model';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './tournament-list.component.html',
  styleUrl: './tournament-list.component.css'
})
export class TournamentListComponent implements OnInit {
  nombre: string = '';
  equiposSeleccionados: number[] = [];
  torneos: Torneo[] = [];
  torneoSeleccionado?: Torneo;
  modoEdicion: boolean = false;
  equiposDisponibles: Club[] = [];
  
  constructor(
    private torneoService: TorneoService,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.cargarTorneos();
    this.cargarClubes();
  }

  cargarClubes() {
    this.clubService.getEquipos().subscribe({
      next: (clubs) => {
        this.equiposDisponibles = clubs;
      },
      error: (error) => {
        console.error('Error al cargar clubes:', error);
      }
    });
  }

  cargarTorneos() {
    this.torneoService.getTorneos().subscribe({
      next: (data) => {
        this.torneos = data;
      },
      error: (error) => {
        console.error('Error al cargar torneos:', error);
      }
    });
  }

  cleanData() {
    this.nombre = '';
    this.equiposSeleccionados = [];
    this.torneoSeleccionado = undefined;
    this.modoEdicion = false;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const torneoData: Torneo = {
        nombre: this.nombre,
        equipos: [...this.equiposSeleccionados]
      };

      if (this.modoEdicion && this.torneoSeleccionado?.id) {
        this.torneoService.updateTorneo(this.torneoSeleccionado.id, torneoData).subscribe({
          next: () => {
            this.cargarTorneos();
            this.cleanData();
            form.resetForm();
          },
          error: (error) => {
            console.error('Error al actualizar torneo:', error);
          }
        });
      } else {
        this.torneoService.createTorneo(torneoData).subscribe({
          next: () => {
            this.cargarTorneos();
            this.cleanData();
            form.resetForm();
          },
          error: (error) => {
            console.error('Error al crear torneo:', error);
          }
        });
      }
    }
  }

  onDelete(id: number) {
    if (confirm('¿Está seguro de eliminar este torneo?')) {
      this.torneoService.deleteTorneo(id).subscribe({
        next: () => {
          this.cargarTorneos();
        },
        error: (error) => {
          console.error('Error al eliminar torneo:', error);
        }
      });
    }
  }

  onEdit(torneo: Torneo) {
    this.torneoSeleccionado = torneo;
    this.nombre = torneo.nombre;
    this.equiposSeleccionados = [...torneo.equipos];
    this.modoEdicion = true;
  }

  obtenerNombreEquipo(equipoId: number): string {
    const equipo = this.equiposDisponibles.find(e => e.id === equipoId);
    return equipo ? equipo.nombre : 'Equipo no encontrado';
  }
}