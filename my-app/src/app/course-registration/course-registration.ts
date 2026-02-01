import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-registration',
  standalone: false,
  templateUrl: './course-registration.html',
  styleUrl: './course-registration.css',
})
export class CourseRegistration {
  form!: FormGroup;
  result = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]
      ],
      course: ['', Validators.required],
      time: ['sang', Validators.required],
      agree: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.result = JSON.stringify(this.form.value);
  }
}
