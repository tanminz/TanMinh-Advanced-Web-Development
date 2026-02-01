import { Component } from '@angular/core';

@Component({
  selector: 'app-mathcomponent',
  standalone: false,
  templateUrl: './mathcomponent.html',
  styleUrl: './mathcomponent.css',
})
export class Mathcomponent {
  a: any = '';
  b: any = '';
  c: any = '';
  result: any = '';

  isNumber(value: any): boolean {
    return value !== '' && !isNaN(value);
  }

  validABC(): boolean {
    return this.isNumber(this.a) && this.isNumber(this.b) && this.isNumber(this.c);
  }

  calcMax() {
    if (!this.validABC()) return;
    this.result = Math.max(+this.a, +this.b, +this.c);
  }

  calcMin() {
    if (!this.validABC()) return;
    this.result = Math.min(+this.a, +this.b, +this.c);
  }

  calcSin() {
    if (!this.isNumber(this.a)) return;
    this.result = Math.sin(+this.a);
  }

  calcCos() {
    if (!this.isNumber(this.a)) return;
    this.result = Math.cos(+this.a);
  }

  calcPow() {
    if (!this.isNumber(this.a) || !this.isNumber(this.b)) return;
    this.result = Math.pow(+this.a, +this.b);
  }
}
