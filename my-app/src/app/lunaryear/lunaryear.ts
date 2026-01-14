import { Component } from '@angular/core';
import { LunarYear } from './lunaryear.model';

@Component({
  selector: 'app-lunaryear',
  standalone: false,
  templateUrl: './lunaryear.html',
  styleUrl: './lunaryear.css',
})
export class Lunaryear {
  // Two-way binding properties
  selectedDay: string = '15';
  selectedMonth: string = '5';
  selectedYear: string = '1986';

  // Arrays for dropdown binding
  days: string[] = [];
  months: string[] = [];
  years: string[] = [];

  // Result properties
  lunarResult: {
    dayOfWeek: string;
    lunarDate: string;
    year: string;
    month: string;
    day: string;
  } | null = null;

  constructor() {
    this.initializeDropdowns();
  }

  initializeDropdowns(): void {
    // Initialize days (1-31)
    for (let i = 1; i <= 31; i++) {
      this.days.push(i.toString());
    }

    // Initialize months (1-12)
    for (let i = 1; i <= 12; i++) {
      this.months.push(i.toString());
    }

    // Initialize years (1900-2100)
    for (let i = 1900; i <= 2100; i++) {
      this.years.push(i.toString());
    }
  }

  convert(): void {
    const day = parseInt(this.selectedDay);
    const month = parseInt(this.selectedMonth);
    const year = parseInt(this.selectedYear);

    // Validate input
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      alert('Vui lòng chọn ngày, tháng, năm hợp lệ');
      return;
    }

    // Create LunarYear instance and get details
    const lunarYear = new LunarYear(day, month, year);
    this.lunarResult = lunarYear.findLunarYearDetail();
  }
}
