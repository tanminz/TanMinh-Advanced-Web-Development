import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  student_id:string="SV113"
  student_name:string="Nguyễn Thị Long Lanh"
  student_email:string="minhdt234111e@st.uel.edu.vn"
  my_logo="TÁYNING2.png"
}
