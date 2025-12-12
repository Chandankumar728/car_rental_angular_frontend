import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AdminDashboard implements OnInit {
  cars: any[] = [];

  constructor(private readonly adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAllCars();
  }

  loadAllCars() {
    this.adminService.getAllCars().subscribe((res: any) => {
      console.log(res);
      this.cars = res;
      this.cdr.markForCheck();
    });
  }

  deleteCar(carId: string) {
    if (!confirm("Are you sure you want to delete this car?")) return;

    this.adminService.deleteCar(carId).subscribe(() => {
      this.loadAllCars();
    });
  }

  editCar(car: any) {
    console.log("Editing car:", car);
    // In real usage: open editable modal or navigate to page
  }

  updateCar(carId: string, carData: any) {
    this.adminService.updateCar(carId, carData).subscribe(() => {
      this.loadAllCars();
    });
  }

  getCarById(carId: string) {
    this.adminService.getCarById(carId).subscribe((res: any) => {
      console.log(res);
    });
  }
}
