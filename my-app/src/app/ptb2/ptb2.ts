import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb2',
  standalone: false,
  templateUrl: './ptb2.html',
  styleUrl: './ptb2.css',
})
export class Ptb2 {
  hsa:string="100"
  hsb:string="200"
  hsc:string="300"
  result:string="............"
  get_solution()
  {
    let a=parseFloat(this.hsa)
    let b=parseFloat(this.hsb)
    let c=parseFloat(this.hsc)

    if (a==0)
    {
      if (b==0 && c==0)
      {
        this.result="PT vô số nghiệm"
      }
      else if (b==0 &&c!=0)
      {
        this.result="PT vô nghiệm"
      }
      else
      {
        let x=-c/b
        this.result="PT có 1 nghiệm: x=" + x
      }
    }
    else
    {
      let d=b*b-4*a*c
      this.result="giải PTB2: Δ=" + d
      if (d<0)
      {
        this.result+="; PT vô nghiệm"
      }
      else if (d==0)
      {
        let x=-b/(2*a)
        this.result+="; PT có nghiệm kép: x1=x2=" + x
      }
      else
      {
        let x1=(-b+Math.sqrt(d))/(2*a)
        let x2=(-b-Math.sqrt(d))/(2*a)
        this.result+="; PT có 2 nghiệm phân biệt: x1=" + x1 + ", x2=" + x2
      }
    }
  }
}
