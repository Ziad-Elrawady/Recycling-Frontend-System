// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MaterialService } from '../../../core/services/material.service';
// import { UserService } from '../../../core/services/user.service';
// import { forkJoin } from 'rxjs';
// import { environment } from '../../../../environments/environment';

// @Component({
//   selector: 'admin-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './dashboard.html',
//   styleUrls: ['./dashboard.css']
// })
// export class DashboardComponent implements OnInit {

//   materials: any[] = [];
//   users: any[] = [];
//   loading = true;

//   constructor(
//     private materialService: MaterialService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     this.loadDashboardData();
//     console.log("Used API:", environment.api);

//   }

//   loadDashboardData() {
//       console.log("Dashboard started loading...");  // TEST 1

//     this.loading = true;

//     forkJoin({
//       materials: this.materialService.getAllMaterials(),
//       users: this.userService.getAllUsers()
//     }).subscribe({
//       next: (res) => {
//         this.materials = res.materials;
//         this.users = res.users;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error loading dashboard data', err);
//         this.loading = false;
//       }
//     });
//   }
// }
