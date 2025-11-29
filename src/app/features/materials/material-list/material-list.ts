import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MaterialService } from '../../../core/services/material.service';
import { Material } from '../../../core/models/material.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './material-list.html',
  styleUrls: ['./material-list.css']
})
export class MaterialList implements OnInit {
  materials: Material[] = [];
  error: string | null = null;

  // form model
  newMaterial: Partial<Material> = {
    typeName: '',
    size: '',
    price: 0,
    factoryId: 1
  };
loading: any;

  constructor(private materialService: MaterialService) {}
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.error = null;
    this.materialService.getAll().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) => {
        this.error = err?.message ?? 'Error loading materials';
      }
    });
  }

  onCreate(form: NgForm) {
    if (!form.valid) return;
    this.materialService.create(this.newMaterial).subscribe({
      next: (created) => {
        this.materials.push(created);
        this.newMaterial = { typeName: '', size: '', price: 0, factoryId: 1 };
        form.resetForm(this.newMaterial);
      },
      error: (err) => {
        this.error = 'Failed to create material';
        console.error(err);
      }
    });
  }

  onDelete(id: number) {
    if (!confirm('هل أنت متأكد من حذف المادة؟')) return;
    this.materialService.delete(id).subscribe({
      next: () => {
        this.materials = this.materials.filter(m => m.id !== id);
      },
      error: (err) => {
        this.error = 'Failed to delete material';
        console.error(err);
      }
    });
  }

  trackById(index: number, item: Material) {
    return item.id;
  }
}
