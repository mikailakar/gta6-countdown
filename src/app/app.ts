import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  title = 'gta6-countdown';

  private timerInterval: any;

  public announcementDate = new Date('2025-05-06T00:00:00');

  public releaseDate = new Date('2026-11-19T00:00:00');

  public timeRemaining = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  public progressPercentage = 0;
  public hasReleased = false;

  ngOnInit(): void {
    this.timerInterval = setInterval(() => {
      this.updateTimerAndProgress();
    }, 1000);

    this.updateTimerAndProgress();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimerAndProgress(): void {
    const now = new Date();
    const distance = this.releaseDate.getTime() - now.getTime();

    if (distance < 0) {
      this.hasReleased = true;
      this.progressPercentage = 100;
      clearInterval(this.timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.timeRemaining = {
      days: this.padZero(days),
      hours: this.padZero(hours),
      minutes: this.padZero(minutes),
      seconds: this.padZero(seconds),
    };

    const totalDuration = this.releaseDate.getTime() - this.announcementDate.getTime();
    const elapsedDuration = now.getTime() - this.announcementDate.getTime();
    const progress = (elapsedDuration / totalDuration) * 100;
    this.progressPercentage = Math.min(100, progress); // Cap at 100%
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
