import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  standalone: false,
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  get_solution(hsa:HTMLInputElement, hsb:HTMLInputElement, result:HTMLElement )
  {
    let a=parseFloat(hsa.value)
    let b=parseFloat(hsb.value)
    if(isNaN(a) || isNaN(b))
    {
      result.innerHTML="Vui lòng nhập số hợp lệ"
    }
    else if(a==0 && b==0)
    {
      result.innerHTML="Tùm lum nghiệm"
    }
    else if(a==0 && b!=0)
    {
      result.innerHTML="Vô nghiệm"
    }
    else
    {
      let x = -b/a
      result.innerHTML=`x = ${x}`
    }
  }

  clear(hsa:HTMLInputElement, hsb:HTMLInputElement, result:HTMLElement): void
  {
    hsa.value = ''
    hsb.value = ''
    result.innerHTML = ''
    hsa.focus()
  }
}
