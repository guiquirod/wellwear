import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar implements OnInit {
  @Output() dateChange = new EventEmitter<Date>();

  calendarDays: Date[] = [];
  offsetFirstDay: number[] = [];
  selectedDay: Date | null = null;
  selectedMonth!: Date;
  monthString: string | null = null;
  yearString: string | null = null;

  ngOnInit(): void {
    const today = new Date();
    this.selectedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.updateCalendarData();
  }

  changeMonth(monthChange: number): void {
    this.selectedMonth = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() + monthChange,
      1
    );
    this.updateCalendarData();
  }

  isFuture(date: Date): boolean {
    const today = new Date();
    const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return formattedToday.getTime() < formattedDate.getTime();
  }

  isLastMonth(): boolean {
    const today = new Date();
    const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const formattedMonth = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth(),
      this.selectedMonth.getDate()
    );

    return formattedToday.getTime() <= formattedMonth.getTime();
  }

  isSelected(date: Date): boolean {
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return (
      this.selectedDay?.getFullYear() === formattedDate.getFullYear() &&
      this.selectedDay?.getMonth() === formattedDate.getMonth() &&
      this.selectedDay?.getDate() === formattedDate.getDate()
    );
  }

  selectDay(date: Date): void {
    this.selectedDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.dateChange.emit(this.selectedDay);
    this.updateCalendarData();
  }

  private updateCalendarData(): void {
    this.monthString = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
      this.selectedMonth
    );
    this.yearString = new Intl.DateTimeFormat('es-ES', { year: '2-digit' }).format(
      this.selectedMonth
    );
    const firstDay = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), 1);
    const offset = (firstDay.getDay() + 6) % 7;
    this.offsetFirstDay = Array.from({ length: offset }, (_, index) => index);

    const lastDay = new Date(
      this.selectedMonth.getFullYear(),
      this.selectedMonth.getMonth() + 1,
      0
    ).getDate();
    this.calendarDays = Array.from(
      { length: lastDay },
      (_, index) =>
        new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), index + 1)
    );
  }
}
