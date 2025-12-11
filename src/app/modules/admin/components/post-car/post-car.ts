import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-car',
  imports: [ReactiveFormsModule],  // Import ReactiveFormsModule for bind mandatory form controls
  templateUrl: './post-car.html',
  styleUrl: './post-car.css',
})
export class PostCar implements OnInit {

  postCarForm!:FormGroup;
  isspinning: boolean = false;

  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private router: Router  
  ) {}

  ngOnInit() {
    this.postCarForm=this.fb.group({
      name:[null,Validators.required],
      brand:[null,Validators.required],
      type:[null,Validators.required],
      modalYear:[null,Validators.required],
      price:[null,Validators.required],
      image:[null,Validators.required],
      description:[null,Validators.required],
      color:[null,Validators.required],
      transmission:[null,Validators.required],
      
    });
  }

 


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.postCarForm.patchValue({ image: file });
    }
  }


   postcar() {
    console.log(this.postCarForm.value);
    const formData = new FormData();
    this.isspinning = true;
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('type', this.postCarForm.get('type')?.value);
    formData.append('modalYear', this.postCarForm.get('modalYear')?.value);
    formData.append('price', this.postCarForm.get('price')?.value);
    formData.append('image', this.postCarForm.get('image')?.value);
    formData.append('description', this.postCarForm.get('description')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);
    formData.append('transmission', this.postCarForm.get('transmission')?.value);
    this.adminService.postcar(formData).subscribe(
      (response) => {
        console.log('Car posted successfully:', response);
        alert('Car posted successfully!');
        
         this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        this.isspinning = false;
        console.error('Error posting car:', error);
        alert('Failed to post car. Please try again.');
      }
    );
  }

  previewImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const previewImage = document.getElementById('previewImage') as HTMLImageElement;
        previewImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
