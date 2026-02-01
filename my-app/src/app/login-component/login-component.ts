import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  resultJson = '';
  errorMsg = '';
  correctEmail = 'tanminh@uel.edu.vn';
  correctPassword = '123456789';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: [false]
    });

    const saved = localStorage.getItem('loginInfo');
    if (saved) {
      this.loginForm.patchValue(JSON.parse(saved));
    }
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Invalid email or password (>=5 chars)';
      return;
    }

    const data = this.loginForm.value;
    this.resultJson = JSON.stringify(data);
    this.errorMsg = '';

    if (data.remember) {
      localStorage.setItem('loginInfo', JSON.stringify(data));
    } else {
      localStorage.removeItem('loginInfo');
    }

    if (data.email === this.correctEmail && data.password === this.correctPassword) {
      this.router.navigate(['/home']);
    }
  }
}
