import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AdminDashboard implements OnInit {
  cars: any[] = [];
  showEditModal = false;
  editCarForm!: FormGroup;
  selectedCar: any = null;

  constructor(private readonly adminService: AdminService,
     private cdr: ChangeDetectorRef, 
     private fb: FormBuilder) {}

  ngOnInit() {
    this.loadAllCars();
    this.initEditForm();
  }

  initEditForm() {
    this.editCarForm = this.fb.group({
      brand: ['', Validators.required],
      type: ['', Validators.required],
      modalYear: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      color: ['', Validators.required],
      transmission: ['', Validators.required]
    });
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
    this.selectedCar = car;
    this.editCarForm.patchValue({
      brand: car.brand,
      type: car.type,
      modalYear: car.modalYear,
      price: car.price,
      description: car.description,
      color: car.color,
      transmission: car.transmission
    });
    this.showEditModal = true;
  }

  updateCar(carId: string, carData: any) {
    this.adminService.updateCar(carId, carData).subscribe(() => {
      this.loadAllCars();
    });
  }

  updateCarFromModal() {
    if (this.editCarForm.valid && this.selectedCar) {
      const formData = new FormData();
      formData.append('brand', this.editCarForm.get('brand')?.value);
      formData.append('type', this.editCarForm.get('type')?.value);
      formData.append('modalYear', this.editCarForm.get('modalYear')?.value);
      formData.append('price', this.editCarForm.get('price')?.value);
      formData.append('description', this.editCarForm.get('description')?.value);
      formData.append('color', this.editCarForm.get('color')?.value);
      formData.append('transmission', this.editCarForm.get('transmission')?.value);
      
      this.adminService.updateCar(this.selectedCar.id, formData).subscribe(() => {
        this.loadAllCars();
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.showEditModal = false;
    this.selectedCar = null;
    this.editCarForm.reset();
  }

  getCarById(carId: string) {
    this.adminService.getCarById(carId).subscribe((res: any) => {
      console.log(res);
    });
  }
}
