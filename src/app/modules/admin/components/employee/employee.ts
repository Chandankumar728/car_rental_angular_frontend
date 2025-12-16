import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { Router } from '@angular/router';

interface IEmployee {
  id: number;
  name: string;
  email: string;
  position: string;
  phoneNumber: string;
  address: string;
  hireDate: string;
}

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee {
  addEmployeeForm!: FormGroup;
  isspinning: boolean = false;
  employees: any[] = [];
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllEmployees();
    
    this.addEmployeeForm = this.fb.group({
      name: [''],
      email: [''],
      position: [''],
      phoneNumber: [''],
      address: [''],
      hireDate: [''],
    });
  }

  


  showAddModal = false;
  showEditModal = false;
  showViewModal = false;
  selectedEmployee: IEmployee | null = null;

  formData: Omit<IEmployee, 'id'> = {
    name: '',
    email: '',
    position: '',
    phoneNumber: '',
    address: '',
    hireDate: '',
  };

  openAddModal() {
    this.resetForm();
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  openEditModal(employee: IEmployee) {
    this.getEmployeeById(employee.id, () => {
      this.formData = { ...this.selectedEmployee! };
      this.showEditModal = true;
    });
  }

  closeEditModal() {
    this.showEditModal = false;
    this.resetForm();
  }

  openViewModal(employee: IEmployee) {
    this.getEmployeeById(employee.id, () => {
      this.showViewModal = true;
    });
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedEmployee = null;
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      position: '',
      phoneNumber: '',
      address: '',
      hireDate: '',
    };
  }

 


   addEmployee(){
    this.adminService.addEmployee(this.formData).subscribe(
      (response:any)=>{
        console.log('Employee added successfully:',response); 
        alert('Employee added successfully!');
        this.getAllEmployees();
        this.closeAddModal();
      },
      (error)=>{
        console.error('Error adding employee:',error);
        alert('Failed to add employee. Please try again.');
      }
    );
  }

  //delete employee by id 
  deleteEmployee(id: number) {
    this.getEmployeeById(id, () => {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.adminService.deleteEmployee(id).subscribe(
          (response: any) => {
            console.log('Employee deleted successfully:', response);
            alert('Employee deleted successfully!');
            this.getAllEmployees();
          },
          (error) => {
            console.error('Error deleting employee:', error);
            alert('Failed to delete employee. Please try again.');
          }
        );
      }
    });
  }

  
  //update employee by id
  updateEmployee() {
    if (this.selectedEmployee) {
      const employeeId = this.selectedEmployee.id;
      this.adminService.updateEmployee(employeeId, this.formData).subscribe(
        (response: any) => {
          console.log('Employee updated successfully:', response);
          alert('Employee updated successfully!');
          this.getAllEmployees();
          this.closeEditModal();
        },
        (error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee. Please try again.');
        }
      );
    }
  }

  

  getAllEmployees() {
    this.adminService.getAllEmployees().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.employees = response.data;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  //get details by employee id 
  getEmployeeById(id: number, callback?: () => void) {
    this.adminService.getEmployeeById(id).subscribe(
      (response: any) => {
        console.log('Employee details:', response);
        this.selectedEmployee = response.data;
        this.cdr.markForCheck();
        if (callback) callback();
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }


  
}
