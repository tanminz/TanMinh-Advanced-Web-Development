import { Component } from '@angular/core';
import { FashionAPIService } from '../myservices/fashion-api.service';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.component.html',
  styleUrls: ['./fashion.component.css']
})
export class FashionComponent {
  fashions: any;
  errMessage: string = '';
  constructor(public _service: FashionAPIService) {
    this._service.getFashions().subscribe({
      next: (data) => { this.fashions = data; },
      error: (err) => { this.errMessage = err; }
    });
  }
  parse_image(base64str: string) {
    let prefix = "data:image/png;base64,";
    if (base64str == null)
      return "";
    if (base64str.startsWith(prefix))
      return base64str;
    return prefix + base64str;
  }
}
