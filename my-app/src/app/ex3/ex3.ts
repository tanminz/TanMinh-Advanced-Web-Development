import { Component } from '@angular/core';

@Component({
  selector: 'app-ex3',
  standalone: false,
  templateUrl: './ex3.html',
})
export class Ex3 {
  myVar: string = 'Hello Angular';

  getMyVar(): string {
    return this.myVar;
  }
}
