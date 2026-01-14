import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  name: string = '';
  email: string = '';
  message: string = '';

  sendContact(): void {
    this.message = `Tui đã nhận được thông báo từ ${this.name} (${this.email})`;
    alert(this.message);
  }
}
