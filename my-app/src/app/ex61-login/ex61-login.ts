import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ex61-login',
  standalone: false,
  templateUrl: './ex61-login.html',
  styleUrl: './ex61-login.css',
})
export class Ex61Login implements OnInit {
  username = '';
  password = '';
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSavedCookie();
  }

  loadSavedCookie(): void {
    const url = '/auth/cookie?t=' + Date.now();
    this.http.get<{ username?: string; password?: string }>(url, { withCredentials: true }).subscribe({
      next: (data) => {
        if (data?.username) this.username = data.username;
        if (data?.password) this.password = data.password;
      },
      error: () => {}
    });
  }

  onLogin(): void {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.http.post<{ success: boolean; message?: string }>('/auth/login', {
      name: this.username,
      password: this.password
    }, { withCredentials: true }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res?.success) {
          this.successMsg = 'Login successful! Cookie saved.';
        } else {
          this.errorMsg = res?.message || 'Login failed.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message || err?.message || 'Connection error. Check server (port 3002).';
      }
    });
  }
}
